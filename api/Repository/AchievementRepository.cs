using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.Dtos.Achievement.Request;
using api.Interface;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AchievementRepository : IAchievementRepository
    {
        private readonly ApplicationDbContext _context;
        public AchievementRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Achievement> CreateAsync(Achievement model)
        {
            await _context.Achievement.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }
        public async Task<List<Achievement>> GetAllAsync()
        {
            return await _context.Achievement.ToListAsync();
        }

        public async Task<Achievement?> GetAsync(int Id)
        {
            var instance = await _context.Achievement
                .AsQueryable()
                .Where(x => x.Id == Id)
                .SingleOrDefaultAsync();
            if (instance == null)
            {
                return null;
            }
            return instance;
        }

        public async Task<Achievement?> UpdateAsync(int Id, Achievement model)
        {
            var instance = await _context.Achievement
                .AsQueryable()
                .Where(x => x.Id == Id)
                .SingleOrDefaultAsync();
            if (instance == null)
            {
                return null;
            }
            instance.Title = model.Title;
            instance.Description = model.Description;
            instance.Category = model.Category;
            instance.Image = model.Image;
            instance.Attachments = model.Attachments;
            await _context.SaveChangesAsync();
            return instance;
        }
        public async Task<string> DeleteAllAsync()
        {
            await _context.Achievement.ExecuteDeleteAsync();
            return "All records deleted";
        }

        public async Task<Achievement?> DeleteByIdAsync(int id)
        {
            var instance = await _context.Achievement
                .AsQueryable()
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
            if (instance == null)
            {
                return null;
            }
            _context.Achievement.Remove(instance);
            await _context.SaveChangesAsync();
            return instance;
        }


    }
}