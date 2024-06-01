using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Skill;
using api.Interface;
using api.Mappers;
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
        public async Task<IActionResult> CreateSkill([FromForm] CreateSkillRequestDto req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            req.Image = await SaveImage(req.ImageFile, "skill");
            var model = req.ToSkillModelFromCreateSkillRequestDto();
            var result = await _skillRepository.CreateAsync(model);
            return Ok(result.ToCreateSkillResponseFromSkillModel());
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetAllSkill()
        {
            var skillList = await _skillRepository.GetAllAsync();
            return Ok(skillList.Select(x => x.ToGetAllSkillResponseDtoFromSkillModel(Request)));
        }

        [HttpDelete]
        [Route("delete")]
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
    }
}