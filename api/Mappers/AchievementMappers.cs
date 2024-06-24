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
                Category = request.Category,
                Image = request.Image,
                Attachments = request.Attachments,
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

        public static GetAllAchievementResponseDto ToGetAllAchievementResponseDtoFromAchievementModel(this Achievement model, HttpRequest request)
        {
            string imageSrc = string.Format("{0}://{1}{2}/Image/achievement/{3}", request.Scheme, request.Host, request.PathBase, model.Image);
            var attachmentSrc = model.Attachments
            .ToList()
            .Select(x => string.Format("{0}://{1}{2}/Image/achievement/attachment/{3}", request.Scheme, request.Host, request.PathBase, x));

            return new GetAllAchievementResponseDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Image = model.Image,
                ImageSrc = imageSrc,
                Attachments = model.Attachments,
                AttachmentSrc = attachmentSrc.ToList(),
            };
        }
        public static GetAchievementResponseDto ToGetAchievementResponseDtoFromAchievementModel(this Achievement model, HttpRequest request)
        {
            string imageSrc = string.Format("{0}://{1}{2}/Image/achievement/{3}", request.Scheme, request.Host, request.PathBase, model.Image);
            var attachmentSrc = model.Attachments
            .ToList()
            .Select(x => string.Format("{0}://{1}{2}/Image/achievement/attachment/{3}", request.Scheme, request.Host, request.PathBase, x));

            return new GetAchievementResponseDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Image = model.Image,
                ImageSrc = imageSrc,
                Attachments = model.Attachments,
                AttachmentSrc = attachmentSrc.ToList(),
            };
        }

        public static Achievement ToAchievementModelFromUpdateAchievementRequestDto(this UpdateAchievementRequestDto request)
        {
            return new Achievement
            {
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Image = request.Image,
                Attachments = request.Attachments
            };
        }

        public static UpdateAcheivementResponseDto ToUpdateAchievementResponseDtoFromAchievementModel(this Achievement model)
        {
            return new UpdateAcheivementResponseDto
            {
                Id = model.Id,
                Title = model.Title
            };
        }
    }
}