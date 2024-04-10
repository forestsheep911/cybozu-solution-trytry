import './main.css'
import './spinner.css'
const aigen = () => {
  function createEnterenceInKintone() {
    const portalTitle = document.querySelector('.ocean-portal-index-header-name')
    if (portalTitle) {
      const enterenceButtonParent = document.createElement('span')
      enterenceButtonParent.innerHTML = `
      <button id="enterenceButton"
        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        AI生成App
      </button>
      `
      // const enterenceButton = enterenceButtonParent.firstChild as HTMLButtonElement
      // console.log(enterenceButton)

      // insert enterenceButtonParent as portalTitle's brother
      portalTitle.parentNode?.insertBefore(enterenceButtonParent, portalTitle.nextSibling)
      enterenceButtonParent.addEventListener('click', function () {
        showUI()
      })
    }
  }
  function showUI() {
    const insertUI = document.createElement('div')
    insertUI.innerHTML = `
  <div class="flex p-4 space-x-4">
  <!-- 左边区域：输入和按钮 -->
  <div class="flex-1 space-y-4">
    <!-- 文本区域 -->
    <textarea
      class="w-full h-32 p-2 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
      placeholder="输入提示词..."
    ></textarea>

    <div class="flex items-center space-x-2"> <!-- Added space-x-2 -->
      <!-- 上传图片按钮 -->
      <button id="uploadButton"
        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        上传图片
      </button>
      <input id="uploadInput" type="file" accept="image/*" class="hidden" />
      <!-- 生成按钮，靠左对齐，放在上传图片的右侧 -->
      <button id="generate" type="file" accept="image/*"
        class="ml-4 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
      >
        生成
      </button>
      <div id="spinner" class="spinner icon-spinner-5" aria-hidden="true"></div>
    </div>
  </div>

  <!-- 右边区域：图片预览 -->
  <div class="flex-1" style="margin-left: 2em;">
    <div class="w-full h-48 border-2 border-gray-200 rounded-lg flex items-center justify-center">
      <!-- 预览图片的占位符或提示文字 -->
      <img id="imagePreview" class="hidden" />
    </div>
  </div>
</div>
  `
    const dialog = document.createElement('div')
    dialog.classList.add('dialog')
    dialog.style.position = 'fixed'
    dialog.style.top = '50%'
    dialog.style.left = '50%'
    dialog.style.width = '60%'
    dialog.style.maxWidth = '800px'
    dialog.style.transform = 'translate(-50%, -50%)'
    dialog.appendChild(insertUI)
    document.body.appendChild(dialog)
    // upload
    const uploadButton = dialog.querySelector('#uploadButton') as HTMLButtonElement
    const uploadInput = document.getElementById('uploadInput') as HTMLInputElement
    uploadButton.addEventListener('click', function () {
      uploadInput.click()
    })
    uploadInput.addEventListener('change', function (event) {
      const target = event.target as HTMLInputElement
      const files = target.files as FileList
      const file = files[0]
      if (file) {
        // 使用FileReader来读取文件
        const reader = new FileReader()
        // 当文件被读取时，设置图片的src为读取的结果
        reader.onload = function (e) {
          const imagePreview = document.getElementById('imagePreview') as HTMLImageElement
          const target = e.target as FileReader
          imagePreview.src = target.result as string
          console.log(target.result)

          // 调整预览区域的宽高比, 使图片不变形 但不能超过当前区域
          imagePreview.style.maxWidth = '100%'
          imagePreview.style.maxHeight = '100%'
          imagePreview.classList.remove('hidden') // 显示图片预览
        }
        // 读取文件作为DataURL
        reader.readAsDataURL(file)
      }
    })
    // spinner
    const spinner = document.getElementById('spinner') as HTMLElement
    spinner.style.display = 'none'
    // generate
    const generate = document.getElementById('generate') as HTMLButtonElement
    generate.addEventListener('click', function () {
      generate.disabled = true
      spinner.style.display = 'inline-block'
      generate.classList.add('opacity-50')
      setTimeout(() => {
        spinner.style.display = 'none'
        generate.disabled = false
        generate.classList.remove('opacity-50')
      }, 8000)
    })
  }
  try {
    kintone.events.on('portal.show', function (event) {
      console.log('portal.show')

      createEnterenceInKintone()
      return event
    })
  } catch (e) {
    if (e instanceof ReferenceError) {
      showUI()
    }
  }
}

export default aigen
