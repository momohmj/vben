<template>
  <PageWrapper title="编辑器">
    <div class="editPage">
      <div>asdasdasdasdasd </div>
      <vue-ueditor-wrap
        class="ueditorBox"
        v-model="msg"
        :key="'xiumi' + new Date()"
        :editor-id="'xiumi'"
        :config="editorConfig"
        @before-init="addXiumiDialog"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';

  let msg: String = '',
    UEDITOR_HOME_URL =
      process.env.NODE_ENV === 'development'
        ? '/UEditor/'
        : `${process.env.VITE_PUBLIC_PATH}UEditor/`,
    editorConfig = {
      serverUrl: '//ueditor.szcloudplus.com/cos',
      UEDITOR_HOME_URL: UEDITOR_HOME_URL,
      catchRemoteImageEnable: true, // 抓取远程图片
      listiconpath: `${UEDITOR_HOME_URL}listicon/`,
    };
  console.log(UEDITOR_HOME_URL);
  function addXiumiDialog(editorId) {
    window.UE.registerUI(
      'xiumi-dialog',
      (editor, uiName) => {
        // 创建 “秀米弹窗”
        const dialog = new window.UE.ui.Dialog({
          // 注意：这是 xiumi-ue-dialog-v5.html 文件的访问链接，这个页面会通过 iframe 的方式嵌入到弹窗里
          iframeUrl: UEDITOR_HOME_URL + '/xiumi-ue-dialog-v5.html',
          editor,
          name: uiName,
          title: '秀米图文消息助手',
          cssRules:
            'width: ' +
            (window.innerWidth - 60) +
            'px; height: ' +
            (window.innerHeight - 60) +
            'px;',
        });
        // 添加自定义按钮用于唤起“秀米弹窗”
        const btn = new window.UE.ui.Button({
          name: 'xiumi-connect',
          title: '秀米',
          cssRules: `background-image: url('//dl.xiumi.us/connect/ue/xiumi-connect-icon.png') !important; background-size: contain;`,
          onclick() {
            dialog.render();
            dialog.open();
          },
        });

        return btn;
      },
      0 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */,
      editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */,
    );
  }
</script>
<style lang="less" scoped>
  .editPage {
    .ueditorBox {
      width: 400px;
      height: 800px;
    }
  }
</style>
