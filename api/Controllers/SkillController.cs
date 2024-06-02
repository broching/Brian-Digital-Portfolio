using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Skill;
using api.Dtos.Skill.Request;
using api.Interface;
using api.Mappers;
using api.Utils;
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
        private readonly FileHelper _fileHelper;
        public SkillController(ISkillRepository skillRepository, IWebHostEnvironment webHostEnvironment, FileHelper fileHelper)
        {
            _skillRepository = skillRepository;
            _webHostEnvironment = webHostEnvironment;
            _fileHelper = fileHelper;
        }

        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> CreateSkill([FromForm] CreateSkillRequestDto req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            req.Image = await _fileHelper.SaveImage(req.ImageFile, "skill");
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
                req.Image = await _fileHelper.SaveImage(req.ImageFile, "skill");
                if (!string.IsNullOrEmpty(oldImagePath))
                {
                    _fileHelper.DeleteOldImage(oldImagePath, "skill");
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
            _fileHelper.DeleteOldImage(currentSkill.Image, "skill");
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
                    _fileHelper.DeleteOldImage(oldItem.Image, "skill");
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
    }
}