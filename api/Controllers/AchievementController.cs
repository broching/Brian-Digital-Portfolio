using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Achievement.Request;
using api.Interface;
using api.Mappers;
using api.Migrations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.OpenApi.Expressions;

namespace api.Controllers
{
    [Route("api/achievement")]
    [ApiController]
    public class AchievementController : ControllerBase
    {
        private readonly IAchievementRepository _achievementRepository;
        private readonly IFileHelperService _fileHelperService;
        public AchievementController(IAchievementRepository achievementRepository, IFileHelperService fileHelperService)
        {
            _achievementRepository = achievementRepository;
            _fileHelperService = fileHelperService;
        }

        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> CreateAchievement([FromForm] CreateAchievementRequestDto request)
        {
            // Validate request object
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            request.Image = await _fileHelperService.SaveImageAsync(request.ImageFile, "achievement");
            if (request.AttachmentFiles != null)
            {
                foreach (var item in request.AttachmentFiles)
                {
                    var name = await _fileHelperService.SaveImageAsync(item, "achievement/attachment");
                    request.Attachments.Add(name);
                }
            }
            // Create and save to DB
            var achievementModel = await _achievementRepository.CreateAsync(request.ToAchievementModelFromCreateAchievementRequestDto());
            return Ok(achievementModel.ToCreateAchievementResponseDtoFromAchievementModel());
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAllAchievement()
        {
            var itemList = await _achievementRepository.GetAllAsync();
            var responseList = itemList.Select(x => x.ToGetAllAchievementResponseDtoFromAchievementModel(Request));
            return Ok(responseList);
        }

        [HttpGet]
        [Route("get/{id: int}")]
        public async Task<IActionResult> GetAchievement([FromRoute] int id)
        {
            var instance = await _achievementRepository.GetAsync(id);
            if (instance == null)
            {
                return NotFound();
            }
            return Ok(instance.ToGetAchievementResponseDtoFromAchievementModel(Request));
        }

        [HttpPut]
        [Authorize]
        [Route("update/{id:int}")]
        public async Task<IActionResult> UpdateAchievement([FromRoute] int id, [FromForm] UpdateAchievementRequestDto request)
        {
            // Validate request object
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var achievement = await _achievementRepository.GetAsync(id);
            if (achievement == null)
            {
                return NotFound();
            }

            // update image 
            var oldImage = achievement.Image;
            if (request.ImageFile != null)
            {
                request.Image = await _fileHelperService.SaveImageAsync(request.ImageFile, "achievement");
                if (!string.IsNullOrEmpty(oldImage))
                {
                    _fileHelperService.DeleteImage(oldImage, "achievement");
                }
            }
            // update attachments
            if (request.AttachmentFiles != null)
            {
                foreach (var item in request.AttachmentFiles)
                {
                    var name = await _fileHelperService.SaveImageAsync(item, "achievement/attachment");
                    request.Attachments.Add(name);
                }
            }

            List<string> difference = achievement.Attachments.Except(request.Attachments).ToList();
            foreach (var item in difference)
            {
                _fileHelperService.DeleteImage(item, "achievement/attachment");
            }
            var model = request.ToAchievementModelFromUpdateAchievementRequestDto();
            var instance = await _achievementRepository.UpdateAsync(id, model);
            if (instance == null)
            {
                return NotFound();
            }
            return Ok(instance.ToUpdateAchievementResponseDtoFromAchievementModel());
        }

        [HttpDelete]
        [Authorize]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var instance = await _achievementRepository.GetAsync(id);
            if (instance == null)
            {
                return NotFound();
            }
            _fileHelperService.DeleteImage(instance.Image, "achievement");
            foreach (var attachment in instance.Attachments)
            {
                _fileHelperService.DeleteImage(attachment, "achievement/attachment");
            }
            var result = await _achievementRepository.DeleteByIdAsync(id);
            if (instance == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete]
        [Authorize]
        [Route("deleteAll")]
        public async Task<IActionResult> DeleteAll()
        {
            var instanceList = await _achievementRepository.GetAllAsync();
            foreach (var item in instanceList)
            {
                _fileHelperService.DeleteImage(item.Image, "acheivement");
                foreach (var attachment in item.Attachments)
                {
                    _fileHelperService.DeleteImage(attachment, "achievement/attachment");
                }
            }
            var result = await _achievementRepository.DeleteAllAsync();
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("deleteMultiple")]
        public async Task<IActionResult> DeleteMultiple([FromBody] DeleteMultipleAcheivementRequestDto request)
        {
            foreach (var item in request.DeleteList)
            {
                await Delete(item);
            }
            return Ok("Selected Items have been deleted");
        }


    }
}