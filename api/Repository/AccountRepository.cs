using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Arguments;
using api.data;
using api.Interface;
using api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        public AccountRepository(ApplicationDbContext context, UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<dynamic> RegisterUserAsync(RegisterUserArgument arg)
        {
            var createdUser = await _userManager.CreateAsync(arg.UserModel, arg.Password);
            if (createdUser.Succeeded)
            {
                // If created user, assign role to user account
                var roleResult = await _userManager.AddToRoleAsync(arg.UserModel, "User");
                if (roleResult.Succeeded)
                {
                    return arg.UserModel;
                }
                else
                    // If Assign role fail, return error
                    return roleResult.Errors;
            }
            else
                // If create user failed, return error
                return createdUser.Errors;
        }

        public async Task<User?> LoginUserAsync(LoginUserArgument arg)
        {
            // Get if user exists
            var user = await _userManager.Users
            .AsQueryable()
            .Where(x => x.Email == arg.Email)
            .FirstOrDefaultAsync();

            if (user == null)
                return null;

            var result = await _signInManager.CheckPasswordSignInAsync(user, arg.Password, false);

            if (!result.Succeeded)
                return null;

            return user;
        }

        public async Task<List<User>?> GetAllUserAsync()
        {
            var userList = await _userManager.Users.ToListAsync();
            return userList;
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            var userInstance = await _userManager.FindByIdAsync(id);
            if (userInstance == null)
            {
                return null;
            }
            return userInstance;
        }

        public async Task<IdentityResult?> DeleteAccountByIdAsync(string id)
        {
            var deleteInstance = await _userManager.Users
            .AsQueryable()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

            if (deleteInstance == null)
            {
                return null;
            }

            var result = await _userManager.DeleteAsync(deleteInstance);
            return result;

        }
    }
}