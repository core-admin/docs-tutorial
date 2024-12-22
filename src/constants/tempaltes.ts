export const templates = [
  {
    id: 'blank',
    label: '空白文件',
    imageUrl: '/templates/blank-document.svg',
    initialContent: '<p></p>',
  },
  {
    id: 'software-proposal',
    label: '软件开发提案',
    imageUrl: '/templates/software-proposal.svg',
    initialContent: `
      <h1>软件开发提案</h1>
      <h2>1. 项目概述</h2>
      <p>本项目旨在开发一个...</p>
      
      <h2>2. 技术方案</h2>
      <h3>2.1 技术架构</h3>
      <p>项目采用以下技术栈：</p>
      <ul>
        <li>前端框架：</li>
        <li>后端技术：</li>
        <li>数据库：</li>
      </ul>
      
      <h3>2.2 功能模块</h3>
      <p>主要功能模块包括：</p>
      <ul>
        <li>用户管理</li>
        <li>内容管理</li>
        <li>数据分析</li>
      </ul>
      
      <h2>3. 项目周期</h2>
      <table>
        <tr>
          <th>阶段</th>
          <th>时间周期</th>
          <th>主要工作</th>
        </tr>
        <tr>
          <td>需求分析</td>
          <td>2周</td>
          <td>详细需求文档</td>
        </tr>
        <tr>
          <td>开发阶段</td>
          <td>8周</td>
          <td>核心功能开发</td>
        </tr>
        <tr>
          <td>测试阶段</td>
          <td>2周</td>
          <td>功能测试与优化</td>
        </tr>
      </table>
      
      <h2>4. 预算估算</h2>
      <p>项目总预算约...</p>
      
      <h2>5. 团队配置</h2>
      <ul>
        <li>项目经理 1名</li>
        <li>高级开发工程师 2名</li>
        <li>前端工程师 2名</li>
        <li>测试工程师 1名</li>
      </ul>
    `,
  },
  {
    id: 'project-proposal',
    label: '项目提案',
    imageUrl: '/templates/project-proposal.svg',
    initialContent: `
      <h1>项目提案</h1>
      
      <h2>1. 项目背景</h2>
      <p>在当前市场环境下...</p>
      
      <h2>2. 项目目标</h2>
      <ul>
        <li>短期目标：</li>
        <li>中期目标：</li>
        <li>长期目标：</li>
      </ul>
      
      <h2>3. 市场分析</h2>
      <h3>3.1 目标市场</h3>
      <p>我们的目标用户是...</p>
      
      <h3>3.2 竞争分析</h3>
      <p>主要竞争对手包括：</p>
      
      <h2>4. 实施计划</h2>
      <table>
        <tr>
          <th>阶段</th>
          <th>时间</th>
          <th>目标</th>
        </tr>
        <tr>
          <td>第一阶段</td>
          <td>Q1</td>
          <td>市场调研</td>
        </tr>
        <tr>
          <td>第二阶段</td>
          <td>Q2</td>
          <td>产品开发</td>
        </tr>
      </table>
      
      <h2>5. 预期效益</h2>
      <p>项目预期可以带来...</p>
      
      <h2>6. 风险评估</h2>
      <ul>
        <li>市场风险：</li>
        <li>技术风险：</li>
        <li>运营风险：</li>
      </ul>
    `,
  },
  {
    id: 'business-letter',
    label: '商务信函',
    imageUrl: '/templates/business-letter.svg',
    initialContent: `
      <p>[发件人姓名]</p>
      <p>[发件人地址]</p>
      <p>[城市, 邮编]</p>
      <br>
      <p>[日期]</p>
      <br>
      <p>[收件人姓名]</p>
      <p>[职位]</p>
      <p>[公司名称]</p>
      <p>[地址]</p>
      <p>[城市, 邮编]</p>
      <br>
      <p>尊敬的 [收件人姓名]：</p>
      <br>
      <p>正文内容...</p>
      <br>
      <p>此致</p>
      <br>
      <p>敬礼</p>
      <br>
      <p>[您的姓名]</p>
      <p>[职位]</p>
      <p>[公司名称]</p>
    `,
  },
  {
    id: 'resume',
    label: '简历',
    imageUrl: '/templates/resume.svg',
    initialContent: `
      <h1>个人简历</h1>
      
      <h2>基本信息</h2>
      <p>姓名：</p>
      <p>性别：</p>
      <p>年龄：</p>
      <p>电话：</p>
      <p>邮箱：</p>
      
      <h2>教育背景</h2>
      <table>
        <tr>
          <th>时间</th>
          <th>学校</th>
          <th>专业</th>
          <th>学历</th>
        </tr>
        <tr>
          <td>2020-2024</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      
      <h2>工作经历</h2>
      <h3>公司名称（2022-至今）</h3>
      <p>职位：</p>
      <p>工作内容：</p>
      <ul>
        <li>负责...</li>
        <li>参与...</li>
        <li>完成...</li>
      </ul>
      
      <h2>专业技能</h2>
      <ul>
        <li>技能1：</li>
        <li>技能2：</li>
        <li>技能3：</li>
      </ul>
      
      <h2>项目经验</h2>
      <h3>项目名称</h3>
      <p>项目描述：</p>
      <p>主要职责：</p>
      <p>项目成果：</p>
    `,
  },
  {
    id: 'cover-letter',
    label: '求职信',
    imageUrl: '/templates/cover-letter.svg',
    initialContent: `
      <p>[您的姓名]</p>
      <p>[地址]</p>
      <p>[联系电话]</p>
      <p>[电子邮件]</p>
      <br>
      <p>[日期]</p>
      <br>
      <p>[收件人姓名]</p>
      <p>[职位]</p>
      <p>[公司名称]</p>
      <p>[公司地址]</p>
      <br>
      <p>尊敬的[收件人姓名]：</p>
      <br>
      <p>我怀着极大的热情写这封信，申请贵公司的[职位名称]职位...</p>
      <br>
      <p>作为一名[您的专业/职业]背景的专业人士，我具备...</p>
      <br>
      <p>我相信我的技能和经验完全符合该职位的要求。我期待有机会能与您进一步沟通...</p>
      <br>
      <p>此致</p>
      <br>
      <p>敬礼</p>
      <br>
      <p>[您的姓名]</p>
    `,
  },
  {
    id: 'letter',
    label: '信件',
    imageUrl: '/templates/letter.svg',
    initialContent: `
      <p>[发件人地址]</p>
      <p>[城市，邮编]</p>
      <br>
      <p>[日期]</p>
      <br>
      <p>[收件人姓名]</p>
      <p>[收件人地址]</p>
      <p>[城市，邮编]</p>
      <br>
      <p>亲爱的[收件人姓名]：</p>
      <br>
      <p>信件正文...</p>
      <br>
      <p>此致</p>
      <br>
      <p>敬礼</p>
      <br>
      <p>[您的姓名]</p>
    `,
  },
];
