using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Interface;
using api.Model;
using Microsoft.IdentityModel.Tokens;

namespace api.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _appSettingsConfig;
        private readonly SymmetricSecurityKey _securityKey;
        public TokenService(IConfiguration appSettingsConfig)
        {
            _appSettingsConfig = appSettingsConfig;
            _securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettingsConfig["JWT:SigningKey"]));
        }
        public string CreateToken(User user)
        {
            var claimList = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName)
            };

            var creds = new SigningCredentials(_securityKey, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claimList),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _appSettingsConfig["JWT:Issuer"],
                Audience = _appSettingsConfig["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}