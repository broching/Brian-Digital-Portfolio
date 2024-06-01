using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Arguments;
using api.data;
using api.Interface;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class SkillRepository : ISkillRepository
    {
        private readonly ApplicationDbContext _context;
        public SkillRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Skill> CreateAsync(Skill model)
        {
            await _context.Skill.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<List<Skill>> GetAllAsync()
        {
            var skillList = await _context.Skill
            .ToListAsync();
            return skillList;
        }

        public async Task<Skill?> GetByIdAsync(int id)
        {
            var instance = await _context.Skill
            .AsQueryable()
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
            if (instance == null)
            {
                return null;
            }
            return instance;
        }

        public async Task<Skill?> UpdateAsync(int id, Skill model)
        {
            var instance = await _context.Skill
            .AsQueryable()
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();

            if (instance == null)
            {
                return null;
            }

            instance.Title = model.Title;
            instance.Description = model.Description;
            instance.Image = model.Image;

            await _context.SaveChangesAsync();

            return instance;
        }

        public async Task<string> DeleteAllAsync()
        {
            await _context.Skill.ExecuteDeleteAsync();
            var response = "Deleted all Skills";
            return response;
        }

        public async Task<Skill?> DeleteByIdAsync(int id)
        {
            var instance = await _context.Skill
            .AsQueryable()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

            if (instance == null)
            {
                return null;
            }
            _context.Skill.Remove(instance);
            await _context.SaveChangesAsync();
            return instance;
        }
    }
}