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
    }
}