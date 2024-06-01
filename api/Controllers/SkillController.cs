using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Skill;
using api.Dtos.Skill.Request;
using api.Interface;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Model.Strings;

namespace api.Controllers
{
    [Route("api/skill")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ISkillRepository _skillRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public SkillController(ISkillRepository skillRepository, IWebHostEnvironment webHostEnvironment)
        {
            _skillRepository = skillRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> CreateSkill([FromForm] CreateSkillRequestDto req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            req.Image = await SaveImage(req.ImageFile, "skill");
            var model = req.ToSkillModelFromCreateSkillRequestDto();
            var result = await _skillRepository.CreateAsync(model);
            return Ok(result.ToCreateSkillResponseDtoFromSkillModel());
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetAllSkill()
        {
            var skillList = await _skillRepository.GetAllAsync();
            return Ok(skillList.Select(x => x.ToGetAllSkillResponseDtoFromSkillModel(Request)));
        }

        [HttpGet]
        [Route("get/{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var instance = await _skillRepository.GetByIdAsync(id);
            if (instance == null)
            {
                return NotFound();
            }
            return Ok(instance.ToGetSkillByIdResponseDtoFromSkillModel(Request));
        }

        [HttpPut]
        [Route("update/{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateById([FromRoute] int id, [FromForm] UpdateSkillRequestDto req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentSkill = await _skillRepository.GetByIdAsync(id);
            if (currentSkill == null)
            {
                return NotFound();
            }
            var oldImagePath = currentSkill.Image;
            if (req.ImageFile != null)
            {
                req.Image = await SaveImage(req.ImageFile, "skill");
                if (!string.IsNullOrEmpty(oldImagePath))
                {
                    DeleteOldImage(oldImagePath, "skill");
                }
            }
            var model = req.ToSkillModelFromUpdateSkillRequestDto();
            var instance = await _skillRepository.UpdateAsync(id, model);
            if (instance == null)
                return NotFound();
            return Ok(instance.ToUpdateSkillResponseDtoFromSkillModel());
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var currentSkill = await _skillRepository.GetByIdAsync(id);
            if (currentSkill == null)
            {
                return NotFound();
            }
            DeleteOldImage(currentSkill.Image, "skill");
            var result = await _skillRepository.DeleteByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("deleteMultiple")]
        [Authorize]
        public async Task<IActionResult> DeleteMultipleById([FromBody] DeleteMultipleByIdRequestDto req)
        {
            foreach (var item in req.DeleteArray)
            {
                var oldItem = await _skillRepository.GetByIdAsync(item);
                if (oldItem != null)
                {
                    DeleteOldImage(oldItem.Image, "skill");
                }
                await _skillRepository.DeleteByIdAsync(item);
            }
            return Ok("Items have been Deleted");
        }

        [HttpDelete]
        [Route("delete")]
        [Authorize]
        public async Task<IActionResult> DeleteAllSkill()
        {
            var result = await _skillRepository.DeleteAllAsync();
            return Ok(result);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile, string folder)
        {
            var imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, $"Image/{folder}", imageName);
            using (var filestream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(filestream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteOldImage(string imageName, string folder)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, $"Image/{folder}", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}