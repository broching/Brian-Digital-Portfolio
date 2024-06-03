using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Experience;
using api.Dtos.Experience.Request;
using api.Interface;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/experience")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly IExperienceRepository _experienceRepository;
        private readonly IFileHelperService _fileHelperService;
        public ExperienceController(IExperienceRepository experienceRepository, IFileHelperService fileHelperService)
        {
            _experienceRepository = experienceRepository;
            _fileHelperService = fileHelperService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateExperience([FromForm] CreateExperienceRequestDto req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            req.ImageCover = await _fileHelperService.SaveImageAsync(req.ImageFile, "experience");
            if (req.ImageFileCollection != null)
            {
                foreach (var item in req.ImageFileCollection)
                {
                    var name = await _fileHelperService.SaveImageAsync(item, "experience");
                    req.ImageCollection.Add(name);
                }
            }
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
        [Route("get/{Id:int}")]
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

            var currentExperience = await _experienceRepository.GetExperienceByIdAsync(id);
            if (currentExperience == null)
            {
                return NotFound();
            }
            // update image cover
            var oldImagePath = currentExperience.ImageCover;
            if (req.ImageFile != null)
            {
                req.ImageCover = await _fileHelperService.SaveImageAsync(req.ImageFile, "experience");
                if (!string.IsNullOrEmpty(oldImagePath))
                {
                    _fileHelperService.DeleteImage(oldImagePath, "experience");
                }
            }
            // update image collection
            if (req.ImageFileCollection != null)
            {
                foreach (var item in req.ImageFileCollection)
                {
                    var name = await _fileHelperService.SaveImageAsync(item, "experience");
                    req.ImageCollection.Add(name);
                }
            }

            List<string> difference = currentExperience.ImageCollection.Except(req.ImageCollection).ToList();
            foreach (var item in difference)
            {
                _fileHelperService.DeleteImage(item, "experience");
            }

            var model = req.ToExperienceModelFromUpdateExperienceRequestDto();
            var instance = await _experienceRepository.UpdateExperienceByIdAsync(id, model);
            if (instance == null)
                return NotFound();
            return Ok(instance.ToUpdateExperienceResponseDtoFromExperienceModel());
        }

        [HttpDelete]
        [Route("deleteAll")]
        public async Task<IActionResult> DeleteAll()
        {
            var instanceList = await _experienceRepository.GetAllExperienceAsync();
            await _experienceRepository.DeleteAllExperienceAsync();
            foreach (var item in instanceList)
            {
                _fileHelperService.DeleteImage(item.ImageCover, "experience");
                foreach (var image in item.ImageCollection)
                {
                    _fileHelperService.DeleteImage(image, "experience");
                }
            }
            return Ok("All experiences have been deleted");
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var instance = await _experienceRepository.GetExperienceByIdAsync(id);
            if (instance == null)
            {
                return NotFound();
            }
            await _experienceRepository.DeleteExperienceByIdAsync(id);
            _fileHelperService.DeleteImage(instance.ImageCover, "experience");
            foreach (var item in instance.ImageCollection)
            {
                _fileHelperService.DeleteImage(item, "experience");
            }
            return Ok(instance);
        }

        [HttpPost]
        [Route("deleteMultiple")]
        public async Task<IActionResult> DeleteMultipleById([FromBody] DeleteMultipleRequestDto req)
        {
            foreach (var item in req.DeleteList)
            {
                var instance = await _experienceRepository.GetExperienceByIdAsync(item);
                await _experienceRepository.DeleteExperienceByIdAsync(item);
                if (instance != null)
                {
                    _fileHelperService.DeleteImage(instance.ImageCover, "experience");
                    foreach (var image in instance.ImageCollection)
                    {
                        _fileHelperService.DeleteImage(image, "experience");
                    }
                }
            };
            return Ok("Deleted Multiple Experiences");
        }

    }
}