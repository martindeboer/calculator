using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularTest.Interfaces
{
    public interface IPalinDromeService
    {
        string GeneratePalinDrome(int minLength, int maxLength);
    }
}
