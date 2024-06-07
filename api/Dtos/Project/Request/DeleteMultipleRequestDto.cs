using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Project.Request
{
    public class DeleteMultipleRequestDto
    {
        public List<int> DeleteList { get; set; } = new List<int>();
    }
}