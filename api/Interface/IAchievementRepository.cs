using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Achievement.Request;
using api.Model;

namespace api.Interface
{
    public interface IAchievementRepository
    {
        Task<Achievement> CreateAsync(Achievement model);
        Task<List<Achievement>> GetAllAsync();
        Task<Achievement?> GetAsync(int Id);
        Task<Achievement?> UpdateAsync(int Id, Achievement model);
        Task<Achievement?> DeleteByIdAsync(int id);
        Task<string> DeleteAllAsync();
    }
}