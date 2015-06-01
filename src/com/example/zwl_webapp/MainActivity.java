package com.example.zwl_webapp;

import android.os.Bundle;
import android.net.Uri;
import android.os.Bundle;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.view.Window;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

	final Activity activity = this;     
    @SuppressLint("SetJavaScriptEnabled") @Override     
    public void onCreate(Bundle savedInstanceState)     
    {      
        super.onCreate(savedInstanceState);    
        //窗口进度条风格
        this.getWindow().requestFeature(Window.FEATURE_PROGRESS);     
        setContentView(R.layout.activity_main);    
        WebView webView = (WebView) findViewById(R.id.webView);  
        //支持JS
        webView.getSettings().setJavaScriptEnabled(true);
        //支持缩放
        webView.getSettings().setSupportZoom(true); 
        //启用内置缩放装置
        webView.getSettings().setBuiltInZoomControls(true);
        //设置进度条
        webView.setWebChromeClient(new WebChromeClient()   
        {            
            public void onProgressChanged(WebView view, int progress)     
            {              
                activity.setTitle("小弟正在努力加载中...");         
                activity.setProgress(progress * 100);       
                if(progress == 100)              
                    activity.setTitle(R.string.app_name);         
             }        
         }  
        );     
      /*  webView.setWebViewClient(new WebViewClient()
        {                         
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl)     
            {                 // Handle the error         
                  
            }
            //
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (Uri.parse(url).getHost().equals("file:///android_asset/webapp_train")) {
                    //Load the site into the default browser
                     Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                     startActivity(intent);
                     return true;
                }
                // Load url into the webview
               return false;
            }
          }
        ); */   
        webView.loadUrl("file:///android_asset/webapp_train/index.html");;    
     }   
} 
