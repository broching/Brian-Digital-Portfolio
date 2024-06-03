using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Experience;
using api.Dtos.Experience.Request;
using api.Dtos.Experience.Response;
using api.Models;

namespace api.Mappers
{
    public static class ExperienceMapper
    {
        public static Experience ToExperienceModelFromCreateExperienceRequestDto(this CreateExperienceRequestDto request)
        {
            return new Experience
            {
                Title = request.Title,
                Description = request.Description,
                DateStart = request.DateStart,
                DateEnd = request.DateEnd,
                Category = request.Category,
                Accomplishment = request.Accomplishment,
                ParentName = request.ParentName,
                ImageCover = request.ImageCover,
                ImageCollection = request.ImageCollection,
            };
        }

        public static CreateExperienceResponseDto ToCreateExperienceResponseDtoFromExperienceModel(this Experience model)
        {
            return new CreateExperienceResponseDto
            {
                Title = model.Title,
                DateStart = model.DateStart,
                DateEnd = model.DateEnd,
                Category = model.Category,
                ParentName = model.ParentName,
            };
        }

        public static GetAllExperienceResponseDto ToGetAllExperiencelResponseDtoFromExperienceModel(this Experience model, HttpRequest request)
        {
            string imageCoverSrc = string.Format("{0}://{1}{2}/Image/experience/{3}", request.Scheme, request.Host, request.PathBase, model.ImageCover);
            var imageCollectionSrc = model.ImageCollection
            .ToList()
            .Select(x => string.Format("{0}://{1}{2}/Image/experience/{3}", request.Scheme, request.Host, request.PathBase, x));

            return new GetAllExperienceResponseDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                DateStart = model.DateStart,
                DateEnd = model.DateEnd,
                Category = model.Category,
                Accomplishment = model.Accomplishment,
                ParentName = model.ParentName,
                ImageCover = model.ImageCover,
                ImageCoverSrc = imageCoverSrc,
                ImageCollection = model.ImageCollection,
                ImageCollectionSrc = imageCollectionSrc.ToList()
            };
        }

        public static GetExperienceByIdResponseDto ToGetExperienceByIdResponseDtoFromExperienceModel(this Experience model, HttpRequest request)
        {
            string imageCoverSrc = string.Format("{0}://{1}{2}/Image/Experience/{3}", request.Scheme, request.Host, request.PathBase, model.ImageCover);
            var imageCollectionSrc = model.ImageCollection
            .ToList()
            .Select(x => string.Format("{0}://{1}{2}/Image/Experience/{3}", request.Scheme, request.Host, request.PathBase, x));

            return new GetExperienceByIdResponseDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                DateStart = model.DateStart,
                DateEnd = model.DateEnd,
                Category = model.Category,
                Accomplishment = model.Accomplishment,
                ParentName = model.ParentName,
                ImageCover = model.ImageCover,
                ImageCoverSrc = imageCoverSrc,
                ImageCollection = model.ImageCollection,
                ImageCollectionSrc = imageCollectionSrc.ToList()
            };
        }

        public static Experience ToExperienceModelFromUpdateExperienceRequestDto(this UpdateExperienceRequestDto request)
        {
            return new Experience
            {
                Title = request.Title,
                Description = request.Description,
                DateStart = request.DateStart,
                DateEnd = request.DateEnd,
                Category = request.Category,
                Accomplishment = request.Accomplishment,
                ParentName = request.ParentName,
                ImageCover = request.ImageCover,
                ImageCollection = request.ImageCollection,
            };
        }

        public static UpdateExperienceResponseDto ToUpdateExperienceResponseDtoFromExperienceModel(this Experience model)
        {
            return new UpdateExperienceResponseDto
            {
                Title = model.Title,
                DateStart = model.DateStart,
                DateEnd = model.DateEnd,
                Category = model.Category,
                ParentName = model.ParentName,
            };
        }

    }
}