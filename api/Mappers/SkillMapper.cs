using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Skill;
using api.Dtos.Skill.Request;
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
        public static Skill ToSkillModelFromUpdateSkillRequestDto(this UpdateSkillRequestDto request)
        {
            return new Skill
            {
                Title = request.Title,
                Description = request.Description,
                Image = request.Image
            };
        }

        public static CreateSkillResponseDto ToCreateSkillResponseDtoFromSkillModel(this Skill model)
        {
            return new CreateSkillResponseDto
            {
                Title = model.Title,
                Description = model.Description,
                Image = model.Image
            };
        }

        public static UpdateSkillResponseDto ToUpdateSkillResponseDtoFromSkillModel(this Skill model)
        {
            return new UpdateSkillResponseDto
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
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Image = model.Image,
                ImageSrc = imageSrc
            };
        }

        public static GetSkillByIdResponseDto ToGetSkillByIdResponseDtoFromSkillModel(this Skill model, HttpRequest request)
        {
            string imageSrc = string.Format("{0}://{1}{2}/Image/skill/{3}", request.Scheme, request.Host, request.PathBase, model.Image);

            return new GetSkillByIdResponseDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Image = model.Image,
                ImageSrc = imageSrc
            };
        }
    }
}
