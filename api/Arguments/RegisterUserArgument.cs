using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;

namespace api.Arguments
{
    public class RegisterUserArgument
    {
        public string Password { get; set; } = string.Empty;
        public User UserModel {get; set;}
    }
}