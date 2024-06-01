using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Arguments;
using api.Migrations;
using api.Models;

namespace api.Interface
{
    public interface ISkillRepository
    {
        Task<Skill> CreateAsync(Skill model);
        Task<List<Skill>> GetAllAsync();
        Task<Skill?> GetByIdAsync(int id);
        Task<Skill?> UpdateAsync(int id, Skill model);
        Task<string> DeleteAllAsync();
        Task<Skill?> DeleteByIdAsync(int id);
    }
}