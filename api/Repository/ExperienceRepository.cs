using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.Interface;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly ApplicationDbContext _context;
        public ExperienceRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Experience> CreateExperienceAsync(Experience model)
        {
            await _context.Experience.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<List<Experience>> GetAllExperienceAsync()
        {
            var expList = await _context.Experience.ToListAsync();
            return expList;
        }

        public async Task<Experience?> GetExperienceByIdAsync(int id)
        {
            var instance = await _context.Experience
            .AsQueryable()
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
            if (instance == null)
            {
                return null;
            }
            return instance;
        }

        public async Task<Experience?> UpdateExperienceByIdAsync(int id, Experience model)
        {
            var instance = await _context.Experience
            .AsQueryable()
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
            if (instance == null)
            {
                return null;
            }
            instance.Title = model.Title;
            instance.Description = model.Description;
            instance.DateStart = model.DateStart;
            instance.DateEnd = model.DateEnd;
            instance.Category = model.Category;
            instance.Accomplishment = model.Accomplishment;
            instance.ParentName = model.ParentName;
            instance.ImageCover = model.ImageCover;
            instance.ImageCollection = model.ImageCollection;
            await _context.SaveChangesAsync();
            return instance;
        }

        public async Task<string> DeleteAllExperienceAsync()
        {
            await _context.Skill.ExecuteDeleteAsync();
            var response = "Deleted all Experience";
            return response;
        }

        public async Task<Experience?> DeleteExperienceByIdAsync(int id)
        {
            var instance = await _context.Experience
            .AsQueryable()
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
            if (instance == null)
            {
                return null;
            }
            _context.Experience.Remove(instance);
            await _context.SaveChangesAsync();
            return instance;
        }
    }
}
