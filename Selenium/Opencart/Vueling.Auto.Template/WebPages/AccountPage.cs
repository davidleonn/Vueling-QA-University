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
    public class AccountPage : CommonPage
    {
        public AccountPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }

        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        protected By AccountPageTitle
        {
            get { return By.Id("logo"); }
        }

        protected IWebElement _AccountPageTitle
        {
            get { return WebDriver.FindElement(AccountPageTitle); }
        }
        private IWebElement HomePageTitle
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Your Store']"); }
        }

        // Define functions and actions

        public AccountPage WaitPageClickHome()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(AccountPageTitle));
            HomePageTitle.Click();
            return this;
        }             
    }
}
