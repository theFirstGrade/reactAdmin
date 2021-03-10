const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    // ���antdʵ�ְ�����: ����import�����(ʹ��babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,  // �Զ������ص���ʽ
    }),

    // ʹ��less-loader��Դ���е�less�ı�����������ָ��
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    }),
)