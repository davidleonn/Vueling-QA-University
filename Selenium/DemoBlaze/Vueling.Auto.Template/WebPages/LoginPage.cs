using DemoBlaze.Auto.Template.Common;
using DemoBlaze.Auto.Template.SetUp;
using DemoBlaze.Auto.Webpages.Base;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections;

namespace DemoBlaze.Auto.WebPages
{
    public class LoginPage : CommonPage
    {
        //Constructor
        public LoginPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath
  
       private IWebElement LoginUsername
       {
            get { return WebDriver.FindElementById("loginusername"); }
       }

       private IWebElement LoginPassword
       {
            get { return WebDriver.FindElementById("loginpassword"); }
       }

        private IWebElement LoginButton
        {
            get { return WebDriver.FindElementByXPath("//button [text()= 'Log in']"); }
        }

        //Functions

        public LoginPage FillAndSubmitLogin()
        {
            LoginUsername.SendKeys("davidleon@col.vueling.com");
            LoginPassword.SendKeys("david");
            LoginButton.Click();
            return this;
        }
    }


}
