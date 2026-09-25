FAST KIOSK V5.2 - INSTALLABLE PWA

ทำให้ https://jeejee1992.github.io/kl-time/fast.html
ติดตั้งบนโทรศัพท์ได้เหมือนแอป

ไฟล์ที่ต้องอัป GitHub ไว้โฟลเดอร์เดียวกับ fast.html:
- fast.html
- manifest.webmanifest
- sw-fast.js
- icon-180.png
- icon-192.png
- icon-512.png

Android / Chrome:
- หลังอัปไฟล์และเปิด fast.html ระบบรองรับ Install App
- ใน “ตั้งค่าเครื่อง” มีปุ่ม “ติดตั้งแอป”
- ถ้า Chrome ส่ง native install prompt มา ปุ่มจะเปิดหน้าติดตั้งให้
- หรือใช้เมนู Chrome > ติดตั้งแอป / เพิ่มไปยังหน้าจอหลัก

iPhone / Safari:
- เปิด fast.html ด้วย Safari
- แตะ Share
- เลือก “เพิ่มไปยังหน้าจอโฮม”
- แตะ “เพิ่ม”
- จะได้ไอคอน KL TIME บนหน้า Home และเปิดแบบ standalone
- ใน “ตั้งค่าเครื่อง” > “ติดตั้งแอป” มีคำแนะนำบนหน้าจอด้วย

PWA:
- start_url = fast.html?app=1
- display = standalone
- portrait
- theme/background = #081525
- รองรับ Apple touch icon
- Service Worker cache เฉพาะ app shell
- fast.html ใช้ network-first เพื่อรับเวอร์ชันใหม่เร็ว
- ไม่แก้/ดัก Apps Script API, Queue หรือ Face logic

ยังคง:
- V5.1 Continuous Face
- Instant Feedback
- Queue First
- Auto Sync
- NO GPS
- iPhone UI
- เสียงไทย
- PIN สำรอง
- Backend เดิม

ไม่ต้อง Deploy Apps Script
ไม่ต้องรัน setupSystem()
ไม่ต้องแก้ index.html

หลังอัป GitHub:
เปิด https://jeejee1992.github.io/kl-time/fast.html?v=52
แล้ว Ctrl+F5 / Reload 1 ครั้ง
