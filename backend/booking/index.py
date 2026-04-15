"""
Приём заявок на бронирование тура и отправка уведомления на почту Kushtan5555@gmail.com
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": {"error": "Method not allowed"}}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    tour_title = body.get("tour_title", "").strip()
    tour_date = body.get("tour_date", "").strip()
    comment = body.get("comment", "").strip()
    persons = body.get("persons", 1)

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": {"error": "Имя и телефон обязательны"},
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    from_email = "Kushtan5555@gmail.com"
    to_email = "89045327706taisiya@gmail.com"

    subject = f"🎭 Новая заявка — Калейдоскоп событий: {tour_title}"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a0a2e; padding: 28px; border-radius: 16px; border: 1px solid #4c1d6e;">
      <h2 style="color: #f472b6; margin-bottom: 4px;">Новая заявка на бронирование</h2>
      <p style="color: #c084fc; margin-top: 0; margin-bottom: 24px;">Тур: <strong style="color: #fff;">{tour_title}</strong></p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #4c1d6e; color: #a78bfa; width: 40%;">ФИО</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #4c1d6e; font-weight: bold; color: #fff;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #4c1d6e; color: #a78bfa;">Телефон</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #4c1d6e; font-weight: bold; color: #fff;">{phone}</td>
        </tr>
        {"<tr><td style='padding: 10px 0; border-bottom: 1px solid #4c1d6e; color: #a78bfa;'>Email</td><td style='padding: 10px 0; border-bottom: 1px solid #4c1d6e; color: #e9d5ff;'>" + email + "</td></tr>" if email else ""}
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #4c1d6e; color: #a78bfa;">Дата тура</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #4c1d6e; color: #e9d5ff;">{tour_date}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #4c1d6e; color: #a78bfa;">Количество человек</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #4c1d6e; color: #e9d5ff;">{persons}</td>
        </tr>
        {"<tr><td style='padding: 10px 0; color: #a78bfa;'>Комментарий</td><td style='padding: 10px 0; color: #e9d5ff;'>" + comment + "</td></tr>" if comment else ""}
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #2d0a4e; border-radius: 8px; border-left: 4px solid #f472b6;">
        <p style="margin: 0; color: #f9a8d4; font-size: 14px;">
          Свяжитесь с клиентом в течение 24 часов по телефону <strong>{phone}</strong>
        </p>
      </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    if smtp_password:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(from_email, smtp_password)
            server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": {"ok": True, "message": "Заявка принята"},
    }