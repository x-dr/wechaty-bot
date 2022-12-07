
import QrcodeTerminal from 'qrcode-terminal'
async function onScan (qrcode, status) {
  QrcodeTerminal.generate(qrcode, {small: true})

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(status, qrcodeImageUrl)
}

export default onScan