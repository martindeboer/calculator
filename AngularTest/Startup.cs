using Microsoft.Owin;
using Owin;
using AngularTest.Activators;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SimpleInjector;
using AngularTest.Services;
using System.Web.Mvc;
using SimpleInjector.Integration.Web.Mvc;
using AngularTest.Interfaces;

[assembly: OwinStartup(typeof(AngularTest.Startup))]

namespace AngularTest
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var container = new Container();

            container.Register<IPalinDromeService,PalinDromeService>(Lifestyle.Transient);
            container.Verify();

            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));

            var activator = new SimpleInjectorHubActivator(container);
            GlobalHost.DependencyResolver.Register(typeof(IHubActivator), () => activator);
            
            app.MapSignalR();
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
        }
    }
}
