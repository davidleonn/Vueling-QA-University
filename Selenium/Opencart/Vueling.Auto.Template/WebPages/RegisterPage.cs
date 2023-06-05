using AventStack.ExtentReports;
using NUnit.Framework;
using Opencart.Auto;
using System.Threading;
using Opencart.Auto.Webpages.Base;
using OpenQA.Selenium;
using Opencart.Auto.Template.SetUp;
using Opencart.Auto.Template.Common;
using OpenQA.Selenium.Support.UI;
using System;

namespace Opencart.Auto.Template.WebPages
{
    public class RegisterPage : CommonPage
    {
        public RegisterPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        protected By AccountTitle
        {
            get { return By.XPath("//h1"); }
        }

        protected IWebElement _AccountTitle
        {
            get { return WebDriver.FindElement(AccountTitle); }
        }

        private IWebElement RegisterInput(string inputId)
        {
            return WebDriver.FindElementById(inputId);
        }

        private IWebElement Checkbox
        { 
            get { return WebDriver.FindElementByXPath("//input[@type='checkbox']"); }
        }

        private IWebElement BtnSubmit
        {
            get { return WebDriver.FindElementByXPath("//input[@type='submit']"); }
        }

        private IWebElement BtnContinue
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Continue']"); }
        }

        // Define functions and actions

        public RegisterPage WaitAndFillFormAndSubmit()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(AccountTitle));

            string randomString = Helpers.GetRandomString(4);

            RegisterInput("input-firstname").SendKeys(randomString);
            RegisterInput("input-lastname").SendKeys(randomString);
            RegisterInput("input-email").SendKeys(randomString+"@test.es");
            RegisterInput("input-telephone").SendKeys("66665");          
            RegisterInput("input-password").SendKeys("David");
            RegisterInput("input-confirm").SendKeys("David");
            Checkbox.Click();
            BtnSubmit.Click();
            BtnContinue.Click();
            return this;
        }

    }
}
