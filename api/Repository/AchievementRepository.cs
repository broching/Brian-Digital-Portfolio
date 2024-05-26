using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.Dtos.Achievement.Request;
using api.Interface;
using api.Model;

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
    }
}