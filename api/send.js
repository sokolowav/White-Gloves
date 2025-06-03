export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' })
  }

  const { phone, contactMethod, serviceSummary, total } = req.body

  const token = process.env.BOT_TOKEN
  const chatId = process.env.CHAT_ID
  let serviceSummaryFormatted = ''
  if (serviceSummary)
    serviceSummaryFormatted =
      '\n' +
      Object.entries(serviceSummary)

        .map(([key, value]) => `• ${key}: ${value}`)
        .join('\n')

  const message = `
🧾 <b>Новый заказ с сайта:</b>

📞 <b>Телефон:</b> ${phone}
📲 <b>Способ связи:</b> ${contactMethod || '-'} 
🧹 <b>Услуги:</b> ${serviceSummaryFormatted}
💰 <b>Стоимость:</b> ${total || '-'}
  `

  const url = `https://api.telegram.org/bot${token}/sendMessage`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    return res.status(500).json({ message: 'Ошибка при отправке' })
  }

  res.status(200).json({ message: 'Отправлено' })
}
