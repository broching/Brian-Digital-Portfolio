using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Experience;
using api.Dtos.Experience.Request;
using api.Interface;
using api.Mappers;
using api.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/experience")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly IExperienceRepository _experienceRepository;
        private readonly FileHelper _fileHelper;
        public ExperienceController(IExperienceRepository experienceRepository, FileHelper fileHelper)
        {
            _experienceRepository = experienceRepository;
            _fileHelper = fileHelper;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateExperience([FromForm] CreateExperienceRequestDto req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            req.ImageCover = await _fileHelper.SaveImage(req.ImageFile, "experience");
            var model = req.ToExperienceModelFromCreateExperienceRequestDto();
            var result = await _experienceRepository.CreateExperienceAsync(model);
            return Ok(result.ToCreateExperienceResponseDtoFromExperienceModel());
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetAllExperience()
        {
            var response = await _experienceRepository.GetAllExperienceAsync();
            return Ok(response.Select(x => x.ToGetAllExperiencelResponseDtoFromExperienceModel(Request)));
        }

        [HttpGet]
        [Route("get{Id:int}")]
        public async Task<IActionResult> GetExperienceById([FromRoute] int id)
        {
            var response = await _experienceRepository.GetExperienceByIdAsync(id);
            if (response == null)
            {
                return NotFound();
            }
            return Ok(response.ToGetExperienceByIdResponseDtoFromExperienceModel(Request));
        }

        [HttpPut]
        [Route("update/{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateById([FromRoute] int id, [FromForm] UpdateExperienceRequestDto req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentSkill = await _experienceRepository.GetExperienceByIdAsync(id);
            if (currentSkill == null)
            {
                return NotFound();
            }
            var oldImagePath = currentSkill.ImageCover;
            if (req.ImageFile != null)
            {
                req.ImageCover = await _fileHelper.SaveImage(req.ImageFile, "experience");
                if (!string.IsNullOrEmpty(oldImagePath))
                {
                    _fileHelper.DeleteOldImage(oldImagePath, "experience");
                }
            }
            var model = req.ToExperienceModelFromUpdateExperienceRequestDto();
            var instance = await _experienceRepository.UpdateExperienceByIdAsync(id, model);
            if (instance == null)
                return NotFound();
            return Ok(instance.ToUpdateExperienceResponseDtoFromExperienceModel());
        }


    }
}