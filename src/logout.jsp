<%@page import="java.util.*, java.lang.reflect.*, javax.servlet.http.HttpSession, javax.servlet.http.Cookie "%>
<%@ page session="true" %>
<%
session.invalidate();

Cookie cookie = new Cookie("JSESSIONID", null); 
cookie.setMaxAge(0); 
cookie.setPath("/"); 
cookie.setSecure(true);
response.addCookie(cookie);

response.addHeader("Cache-Control", "no-cache,no-store,private,must-revalidate,max-stale=0,post-check=0,pre-check=0"); 
response.addHeader("Pragma", "no-cache"); 
response.addDateHeader ("Expires", 0);
%>
<script type = "text/javascript" >  
        function preventBack() { window.history.forward(); }  
        setTimeout("preventBack()", 0);  
	window.onunload = function () { null };  
</script>
<%
response.sendRedirect("../login.jsp");
%>