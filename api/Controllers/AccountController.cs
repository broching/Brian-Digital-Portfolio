using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Arguments;
using api.Dtos.Account.Request;
using api.Dtos.Account.Response;
using api.Interface;
using api.Mappers;
using api.Migrations;
using api.Model;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IAccountRepository _accountRepository;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IAccountRepository accountRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _accountRepository = accountRepository;
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
                var arg = new RegisterUserArgument
                {
                    Password = request.Password,
                    UserModel = user
                };
                var createdUser = await _accountRepository.RegisterUserAsync(arg);
                if (createdUser.GetType() == typeof(User))
                {
                    // If assign role succeed, create token and return response Dto
                    var token = _tokenService.CreateToken(user);
                    return Ok(user.ToCreateAccountResponseDtoFromUserModel(token));
                }
                // bad request 
                return BadRequest(createdUser);
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

            var arg = new LoginUserArgument
            {
                Email = request.Email,
                Password = request.Password
            };
            var user = await _accountRepository.LoginUserAsync(arg);

            if (user == null)
                return Unauthorized("Invalid Username Or Password");

            // Since user exists, password matches, return response Dto with Token
            var token = _tokenService.CreateToken(user);
            return Ok(user.ToLoginAccountResponseDtoFromUserModel(token));
        }

        [HttpGet]
        [Route("get")]
        [Authorize]
        public async Task<IActionResult> GetAllAccount()
        {
            // Response is currently a list of User : Identity model
            var userList = await _accountRepository.GetAllUserAsync();
            return Ok(userList);
        }

        [HttpGet]
        [Route("get/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAccountById([FromRoute] string id)
        {
            // Response is currently a user : Identity model
            var userInstance = await _accountRepository.GetUserByIdAsync(id);
            if (userInstance == null)
            {
                return NotFound($"User of ID: {id} not found");
            }
            return Ok(userInstance);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAccount([FromRoute] string id)
        {
            var result = await _accountRepository.DeleteAccountByIdAsync(id);
            if (result == null)
            {
                return NotFound($"User of ID: {id} not found");
            }
            return Ok($"User of ID: {id} has been deleted");
        }
    }
}