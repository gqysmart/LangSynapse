- Document structure
  \*\* 页面整体结构（Document-Level Layout）
  <body>
    <header>...<!-- 全站顶部导航栏 --></header>

    <main>
      <aside>...<!-- 全站侧边栏，如导航菜单 --></aside>

      <section>
        <header>...<!-- Section 标题，比如“推荐文章” --></header>

        <!-- 这里可以有多个文章 -->
        <article>
          <header>...<!-- 文章标题，作者信息 --></header>
          <p>内容段落...</p>
          <aside>...<!-- 如补充阅读、作者简介 --></aside>
          <footer>...<!-- 文章尾部信息，如“阅读全文”链接 --></footer>
        </article>

        <article>...</article>

        <footer>...<!-- Section 的尾部，比如分页控制 --></footer>
      </section>

      <section>...</section>

    </main>

    <footer>...<!-- 全站底部信息 --></footer>
  </body>

\*\* 二、语义结构的嵌套规则
DOM 元素 说明

<header>	可以出现在整个页面、每个 <section>、每个 <article> 中，但不能放在 <footer> 中
<main>	每个页面只能出现一次，不能出现在 <article>、<section>、<aside>、<header> 中
<section>	用于分组页面的一个逻辑区块，可以嵌套多个 <article>
<article>	自包含内容，可独立使用和传播，比如一篇博客文章、论坛帖
<aside>	可在页面、section 或 article 内，提供辅助内容，如目录、作者信息、相关链接
<footer>	也可以在页面、section 或 article 中，表示尾部信息
<div>	仅用于无语义需求的结构或样式控制，不能表达具体结构含义

\*\*

<div
  className="
    flex items-center justify-between        // layout
    relative z-10 top-0                      // positioning
    w-full max-w-lg mx-auto px-4 py-2       // box model
    border-b border-gray-200 rounded-md      // border
    text-gray-800 text-sm font-medium        // typography
    bg-white shadow-sm                      // visual
    transition-colors duration-200          // animation
  "
>
  ...
</div>
