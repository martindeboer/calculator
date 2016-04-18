using System;
using AngularTest.Services;
using System.Text.RegularExpressions;
using Xunit;

namespace AngularTest.UnitTests
{

    public class PalinDromeServiceTest
    {
        private PalinDromeService _palinDromeService;

        public PalinDromeServiceTest()
        {
            _palinDromeService = new PalinDromeService();
        }

        [Fact]
        public void GeneratePalinDromeTest()
        {
            var palinDrome1 = _palinDromeService.TurnStringIntoPalinDrome("bee");
            var palinDrome2 = _palinDromeService.TurnStringIntoPalinDrome("beep");


            Assert.True(palinDrome1 == "beeeb" && palinDrome2 == "beeppeeb");
        }

        [Fact]
        public void GenerateRandomStringTest ()
        {
            // Is this really a proper unit-test? By using Random it's not really consistent, but it does get tested.
            bool validSoFar = true;
            Random random = new Random();

            for (int count=0;count<1000 && validSoFar;count++)
            {
                var minLength = random.Next(1, 30);
                var maxLength = random.Next(31, 100);

                var randomString = _palinDromeService.GenerateRandomString(minLength,maxLength);

                validSoFar = (Regex.Matches("", "([^a-zA-Z]{1,})").Count == 0) && randomString.Length >= minLength && randomString.Length <= maxLength; 
            }

            Assert.True(validSoFar);
        }

        [Theory]
        [InlineData(-1,1)]
        [InlineData(5,3)]
        [InlineData(-6,-3)]
        [InlineData(1,101)]
        public void GenerateRandomStringExceptionTest (int minLength, int maxLength)
        {
            bool exceptionThrown = false;

            try
            {
                _palinDromeService.GenerateRandomString(minLength, maxLength);
            } catch (Exception)
            {
                exceptionThrown = true;
            }

            Assert.True(exceptionThrown);
        }
    }
}
