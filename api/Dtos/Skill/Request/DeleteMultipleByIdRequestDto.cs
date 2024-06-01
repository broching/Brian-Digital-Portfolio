using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Skill.Request
{
    public class DeleteMultipleByIdRequestDto
    {
        public List<int> DeleteArray { get; set; } = new List<int>();
    }
}