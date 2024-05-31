using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account.Request;
using api.Dtos.Account.Response;
using api.Model;

namespace api.Mappers
{
    public static class AccountMappers
    {
        public static User ToUserModelFromCreateAccountRequestDto(this CreateAccountRequestDto request)
        {
            return new User
            {
                Email = request.Email,
                UserName = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
            };
        }

        public static CreateAccountResponseDto ToCreateAccountResponseDtoFromUserModel(this User model, string token)
        {
            return new CreateAccountResponseDto
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Token = token,
            };
        }

        public static LoginAccountResponseDto ToLoginAccountResponseDtoFromUserModel(this User model, string token)
        {
            return new LoginAccountResponseDto
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Token = token,
            };
        }
    }
}