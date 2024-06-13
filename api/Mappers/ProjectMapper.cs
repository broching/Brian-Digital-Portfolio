using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Project.Request;
using api.Dtos.Project.Response;
using api.Models;

namespace api.Mappers
{
    public static class ProjectMapper
    {
        public static Project ToProjectModelFromCreateProjectRequestDto(this CreateProjectRequestDto request)
        {
            return new Project
            {
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Accomplishment = request.Accomplishment,
                WebLink = request.WebLink,
                ImageCover = request.ImageCover,
                ImageCollection = request.ImageCollection,
            };
        }

        public static CreateProjectResponseDto ToCreateProjectResponseDtoFromProjectModel(this Project model)
        {
            return new CreateProjectResponseDto
            {
                Title = model.Title,
                Category = model.Category,
            };
        }

        public static GetAllProjectResponseDto ToGetAllProjectResponseDtoFromProjectModel(this Project model, HttpRequest request)
        {
            string imageCoverSrc = string.Format("{0}://{1}{2}/Image/project/{3}", request.Scheme, request.Host, request.PathBase, model.ImageCover);
            var imageCollectionSrc = model.ImageCollection
            .ToList()
            .Select(x => string.Format("{0}://{1}{2}/Image/project/{3}", request.Scheme, request.Host, request.PathBase, x));

            return new GetAllProjectResponseDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Category = model.Category,
                Accomplishment = model.Accomplishment,
                WebLink = model.WebLink,
                ImageCover = model.ImageCover,
                ImageCoverSrc = imageCoverSrc,
                ImageCollection = model.ImageCollection,
                ImageCollectionSrc = imageCollectionSrc.ToList()
            };
        }

        public static GetProjectByIdResponseDto ToGetProjectByIdResponseDtoFromProjectModel(this Project model, HttpRequest request)
        {
            string imageCoverSrc = string.Format("{0}://{1}{2}/Image/Project/{3}", request.Scheme, request.Host, request.PathBase, model.ImageCover);
            var imageCollectionSrc = model.ImageCollection
            .ToList()
            .Select(x => string.Format("{0}://{1}{2}/Image/Project/{3}", request.Scheme, request.Host, request.PathBase, x));

            return new GetProjectByIdResponseDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Category = model.Category,
                Accomplishment = model.Accomplishment,
                WebLink = model.WebLink,
                ImageCover = model.ImageCover,
                ImageCoverSrc = imageCoverSrc,
                ImageCollection = model.ImageCollection,
                ImageCollectionSrc = imageCollectionSrc.ToList()
            };
        }
        public static Project ToProjectModelFromUpdateProjectRequestDto(this UpdateProjectRequestDto request)
        {
            return new Project
            {
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                WebLink = request.WebLink,
                Accomplishment = request.Accomplishment,
                ImageCover = request.ImageCover,
                ImageCollection = request.ImageCollection,
            };
        }

        public static UpdateProjectResponseDto ToUpdateProjectResponseDtoFromProjectModel(this Project model)
        {
            return new UpdateProjectResponseDto
            {
                Title = model.Title,
                Category = model.Category,
            };
        }

    }
}
