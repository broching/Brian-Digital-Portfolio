using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Achievement.Request;
using api.Interface;
using api.Mappers;
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
        public async Task<IActionResult> CreateAchievement(CreateAchievementRequestDto request)
        {
            // Validate request object
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Create and save to DB
            var achievementModel = await _achievementRepository.CreateAsync(request.ToAchievementModelFromCreateAchievementRequestDto());
            return Ok(achievementModel.ToCreateAchievementResponseDtoFromAchievementModel());
        }

      
    }
}