using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Achievement.Request
{
    public class DeleteMultipleAcheivementRequestDto
    {
        public List<int> DeleteList { get; set; } = new List<int>();
    }
}