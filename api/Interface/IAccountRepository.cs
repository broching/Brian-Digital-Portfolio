using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Arguments;
using api.Model;
using Microsoft.AspNetCore.Identity;

namespace api.Interface
{
    public interface IAccountRepository
    {
        Task<dynamic> RegisterUserAsync(RegisterUserArgument arg);
        Task<User?> LoginUserAsync(LoginUserArgument arg);
        Task<List<User>?> GetAllUserAsync();
        Task<User?> GetUserByIdAsync(string id);
        Task<IdentityResult?> DeleteAccountByIdAsync(string id);
    }
}