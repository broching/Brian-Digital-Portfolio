using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.Interface;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace api.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public ProjectRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        public async Task<Project> CreateAsync(Project model)
        {
            await _dbContext.Project.AddAsync(model);
            await _dbContext.SaveChangesAsync();
            return model;
        }

        public async Task<List<Project>> GetAllAsync()
        {
            var projectList = await _dbContext.Project.ToListAsync();
            return projectList;
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            var project = await _dbContext.Project
                .AsQueryable()
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
            if (project == null)
            {
                return null;
            }
            return project;
        }

        public async Task<Project?> UpdateAsync(int id, Project model)
        {
            var instance = await _dbContext.Project
                .AsQueryable()
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();

            if (instance == null)
            {
                return null;
            }
            instance.Title = model.Title;
            instance.Description = model.Description;
            instance.Category = model.Category;
            instance.Accomplishment = model.Accomplishment;
            instance.ImageCover = model.ImageCover;
            instance.ImageCollection = model.ImageCollection;
            await _dbContext.SaveChangesAsync();
            return instance;
        }

        public async Task<string> DeleteAllAsync()
        {
            await _dbContext.Project.ExecuteDeleteAsync();
            var response = "Deleted all Projects";
            return response;
        }

        public async Task<Project?> DeleteByIdAsync(int id)
        {
            var instance = await _dbContext.Project
                .AsQueryable()
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();

            if (instance == null)
            {
                return null;
            }

            _dbContext.Remove(instance);
            await _dbContext.SaveChangesAsync();
            return instance;
        }

    }
}