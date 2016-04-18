using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

using AngularTest.Interfaces;
using AngularTest.Services;
using System.Timers;
using System.Threading.Tasks;

namespace AngularTest.Hubs
{
    public class MainHub : Hub
    {
        // TODO: make an overarching class that contains the timer + min and max.
        private static Dictionary<string, Timer> _timerMappings;
        private static Dictionary<string, int> _minimums;
        private static Dictionary<string, int> _maximums;
        private Timer _timer;
        private const int _startAfter = 2000;
        private const int _fireEvery = 2000;
        private IPalinDromeService _palinDromeService;

        public MainHub(IPalinDromeService palinDromeService)
        {
            _palinDromeService = palinDromeService;

            if (_timerMappings == null)
            {
                _timerMappings = new Dictionary<string, Timer>();
                _minimums = new Dictionary<string, int>();
                _maximums = new Dictionary<string, int>();
            }
                              
        }

        public void Start(int min, int max)
        {

            SetMinimum(min);
            SetMaximum(max);

            SetTimer();

            _timerMappings[Context.ConnectionId].Start(); 
        }

        private void SetTimer ()
        {
            if (!_timerMappings.ContainsKey(Context.ConnectionId))
            {
                _timer = new Timer();

                _timer.Interval = _fireEvery;
                _timer.Elapsed += new ElapsedEventHandler(this.OnTick);

                _timerMappings.Add(Context.ConnectionId, _timer);
            }
        }

        private void SetMinimum (int min)
        {
            if (!_minimums.ContainsKey(Context.ConnectionId))
            {
                _minimums.Add(Context.ConnectionId, min);
            }
            else
            {
                _minimums[Context.ConnectionId] = min;
            }
        }

        private void SetMaximum(int max)
        {
            if (!_maximums.ContainsKey(Context.ConnectionId))
            {
                _maximums.Add(Context.ConnectionId, max);
            }
            else
            {
                _maximums[Context.ConnectionId] = max;
            }
        }


        public void Stop ()
        {
            if (!_timerMappings.ContainsKey(Context.ConnectionId))
            {
                return;
            }

            _timerMappings[Context.ConnectionId].Stop();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
           
            return base.OnDisconnected(stopCalled);
        }

        private void OnTick (object sender, EventArgs e)
        {
            var min = _minimums[Context.ConnectionId];
            var max = _maximums[Context.ConnectionId];

            var newPalinDrome = _palinDromeService.GeneratePalinDrome(min, max);

            Clients.Caller.newPalinDrome(newPalinDrome);
        }
    }
}