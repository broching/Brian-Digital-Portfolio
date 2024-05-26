using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Achievement.Request;
using api.Dtos.Achievement.Response;
using api.Model;
using Microsoft.AspNetCore.Http.Connections;

namespace api.Mappers
{
    public static class AchievementMappers
    {
        public static Achievement ToAchievementModelFromCreateAchievementRequestDto(this CreateAchievementRequestDto request)
        {
            return new Achievement
            {
                Title = request.Title,
                Description = request.Description,
                Image = request.Image
            };
        }

        public static CreateAchievementResponseDto ToCreateAchievementResponseDtoFromAchievementModel(this Achievement model)
        {
            return new CreateAchievementResponseDto
            {
                Id = model.Id,
                Title = model.Title,
            };
        }
    }
}