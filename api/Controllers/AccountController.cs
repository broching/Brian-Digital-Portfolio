using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account.Request;
using api.Dtos.Account.Response;
using api.Interface;
using api.Mappers;
using api.Migrations;
using api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] CreateAccountRequestDto request)
        {
            // Loop everything in Try Catch clause because many errors can occur
            try
            {   
                // Validate request object
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = request.ToUserModelFromCreateAccountRequestDto();
                var createdUser = await _userManager.CreateAsync(user, request.Password);
                if (createdUser.Succeeded)
                {
                    // If created user, assign role to user account
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded)
                    {
                        // If assign role succeed, create token and return response Dto
                        var token = _tokenService.CreateToken(user);
                        return Ok(user.ToCreateAccountResponseDtoFromUserModel(token));
                    }
                    else
                        // If Assign role fail, return error
                        return BadRequest(roleResult.Errors);
                }
                else
                // If create user failed, return error
                    return BadRequest(createdUser.Errors);
            }
            catch (Exception e)
            {
                // Exception handling, in case of unknown errors
                return BadRequest($"Error occured as {e}");
            }
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(LoginAccountRequestDto request)
        {
            // Validate request Object
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Get if user exists
            var user = await _userManager.Users
            .AsQueryable()
            .Where(x => x.Email == request.Email)
            .FirstOrDefaultAsync();

            if (user == null)
                return Unauthorized("Invalid Username Or Password");

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded)
                return Unauthorized("Invalid Username Or Password");
                
            // Since user exists, password matches, return response Dto with Token
            var token = _tokenService.CreateToken(user);
            return Ok(user.ToLoginAccountResponseDtoFromUserModel(token));
        }
    }
}