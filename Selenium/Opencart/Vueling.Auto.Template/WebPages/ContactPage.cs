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
    public class ContactPage : CommonPage
    {
        public ContactPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        protected By LocationText
        {
            get { return By.XPath("//h3[text()='Our Location']"); }
        }

        protected IWebElement _LocationText
        {
            get { return WebDriver.FindElement(LocationText); }
        }       

        private IWebElement ContactFormInput(string inputName)
        {
            return WebDriver.FindElementById(inputName);
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

        public ContactPage WaitContactPage()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(LocationText));
            return this;    
        }

        public ContactPage FillFormAndSubmit()
        {
            ContactFormInput("input-name");
            ContactFormInput("input-email");
            ContactFormInput("input-enquiry").SendKeys("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
            BtnSubmit.Click();
            BtnContinue.Click();
            
            return this;
        }
    }
}
