using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Achievement.Request;
using api.Interface;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace api.Controllers
{
    [Route("api/achievement")]
    [ApiController]
    public class AchievementController : ControllerBase
    {
        private readonly IAchievementRepository _achievementRepository;
        public AchievementController(IAchievementRepository achievementRepository)
        {
            _achievementRepository = achievementRepository;
        }

        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> CreateAchievement([FromBody] CreateAchievementRequestDto request)
        {
            // Validate request object
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Create and save to DB
            var achievementModel = await _achievementRepository.CreateAsync(request.ToAchievementModelFromCreateAchievementRequestDto());
            return Ok(achievementModel.ToCreateAchievementResponseDtoFromAchievementModel());
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAllAchievement()
        {
            return Ok();
        }

      
    }
}