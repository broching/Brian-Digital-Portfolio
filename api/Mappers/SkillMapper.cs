using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Skill;
using api.Dtos.Skill.Response;
using api.Migrations;
using api.Models;
using Azure.Core;
using Microsoft.AspNetCore.Http; // Import the namespace for Request object

namespace api.Mappers
{
    public static class SkillMapper
    {
        public static Skill ToSkillModelFromCreateSkillRequestDto(this CreateSkillRequestDto request)
        {
            return new Skill
            {
                Title = request.Title,
                Description = request.Description,
                Image = request.Image
            };
        }

        public static CreateSkillResponse ToCreateSkillResponseFromSkillModel(this Skill model)
        {
            return new CreateSkillResponse
            {
                Title = model.Title,
                Description = model.Description,
                Image = model.Image
            };
        }

        public static GetAllSkillResponseDto ToGetAllSkillResponseDtoFromSkillModel(this Skill model, HttpRequest request)
        {
            string imageSrc = string.Format("{0}://{1}{2}/Image/skill/{3}", request.Scheme, request.Host, request.PathBase, model.Image);

            return new GetAllSkillResponseDto
            {
                Title = model.Title,
                Description = model.Description,
                Image = model.Image,
                ImageSrc = imageSrc
            };
        }
    }
}
