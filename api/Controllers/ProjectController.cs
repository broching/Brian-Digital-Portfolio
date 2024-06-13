using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Project.Request;
using api.Interface;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/project")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IFileHelperService _fileHelperService;
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IFileHelperService fileHelperService, IProjectRepository projectRepository)
        {
            _fileHelperService = fileHelperService;
            _projectRepository = projectRepository;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateProject([FromForm] CreateProjectRequestDto req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            req.ImageCover = await _fileHelperService.SaveImageAsync(req.ImageCoverFile, "project");
            if (req.ImageCollectionFile != null)
            {
                foreach (var item in req.ImageCollectionFile)
                {
                    var name = await _fileHelperService.SaveImageAsync(item, "project");
                    req.ImageCollection.Add(name);
                }
            }
            var model = req.ToProjectModelFromCreateProjectRequestDto();
            var response = await _projectRepository.CreateAsync(model);
            return Ok(response.ToCreateProjectResponseDtoFromProjectModel());
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAllProject()
        {
            var projectList = await _projectRepository.GetAllAsync();
            var response = projectList.Select(x => x.ToGetAllProjectResponseDtoFromProjectModel(Request));
            return Ok(response);
        }

        [HttpGet]
        [Authorize]
        [Route("get/{id:int}")]
        public async Task<IActionResult> GetProjectById([FromRoute] int id)
        {
            var project = await _projectRepository.GetByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project.ToGetProjectByIdResponseDtoFromProjectModel(Request));
        }

        [HttpPut]
        [Route("update/{id:int}")]
        public async Task<IActionResult> UpdateProjecById([FromRoute] int id, [FromForm] UpdateProjectRequestDto req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = await _projectRepository.GetByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            // update image cover
            var oldImageCoverPath = project.ImageCover;
            if (req.ImageCoverFile != null)
            {
                req.ImageCover = await _fileHelperService.SaveImageAsync(req.ImageCoverFile, "project");
                if (!string.IsNullOrEmpty(oldImageCoverPath))
                {
                    _fileHelperService.DeleteImage(oldImageCoverPath, "project");
                }
            }
            // update image collection
            if (req.ImageCollectionFile != null)
            {
                foreach (var item in req.ImageCollectionFile)
                {
                    var name = await _fileHelperService.SaveImageAsync(item, "project");
                    req.ImageCollection.Add(name);
                }
            }

            List<string> difference = project.ImageCollection.Except(req.ImageCollection).ToList();
            foreach (var item in difference)
            {
                _fileHelperService.DeleteImage(item, "project");
            }

            var model = req.ToProjectModelFromUpdateProjectRequestDto();
            var result = await _projectRepository.UpdateAsync(id, model);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result.ToUpdateProjectResponseDtoFromProjectModel());
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var instance = await _projectRepository.GetByIdAsync(id);
            if (instance == null)
            {
                return NotFound();
            }
            _fileHelperService.DeleteImage(instance.ImageCover, "project");
            foreach (var image in instance.ImageCollection)
            {
                _fileHelperService.DeleteImage(image, "project");
            }
            var result = await _projectRepository.DeleteByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete]
        [Route("deleteAll")]
        public async Task<IActionResult> DeleteAll()
        {
            var instanceList = await _projectRepository.GetAllAsync();
            foreach (var item in instanceList)
            {
                _fileHelperService.DeleteImage(item.ImageCover, "project");
                foreach (var image in item.ImageCollection)
                {
                    _fileHelperService.DeleteImage(image, "project");
                }
            }
            var result = await _projectRepository.DeleteAllAsync();
            return Ok(result);
        }

        [HttpPost]
        [Route("deleteMultiple")]
        public async Task<IActionResult> DeleteMultipleById([FromBody] DeleteMultipleProjectRequestDto req)
        {
            foreach (var item in req.DeleteList)
            {
                var instance = await _projectRepository.GetByIdAsync(item);
                await _projectRepository.DeleteByIdAsync(item);
                if (instance != null)
                {
                    _fileHelperService.DeleteImage(instance.ImageCover, "project");
                    foreach (var image in instance.ImageCollection)
                    {
                        _fileHelperService.DeleteImage(image, "project");
                    }
                }
            };
            return Ok("Deleted Multiple Projects");
        }
    }
}