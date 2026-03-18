export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 页面标题 */}
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            服务条款
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          欢迎使用 LOOM 服务。本条款说明了您使用我们服务时需要遵守的规则和条件。
        </p>
      </section>

      {/* 服务条款内容 */}
      <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">1. 接受条款</h2>
          <p className="text-gray-300 leading-relaxed">
            访问或使用 LOOM 服务即表示您同意受本服务条款的约束。如果您不同意本条款的任何部分，您不得使用我们的服务。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">2. 服务描述</h2>
          <p className="text-gray-300 leading-relaxed">
            LOOM 提供免费的在线 AI 塔罗占卜服务，包括牌阵生成、AI 解读和相关内容。我们保留随时修改、暂停或终止服务的权利，无需事先通知。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">3. 用户行为</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            当您使用我们的服务时，您同意：
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>遵守所有适用的法律法规</li>
            <li>不使用服务进行任何非法或不当活动</li>
            <li>不干扰或破坏服务的正常运行</li>
            <li>不侵犯他人的知识产权或其他权利</li>
            <li>不尝试未经授权访问服务或相关系统</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">4. 知识产权</h2>
          <p className="text-gray-300 leading-relaxed">
            LOOM 服务中包含的所有内容，包括但不限于文本、图像、音频、视频、标志、商标和软件，均受版权、商标和其他知识产权法律的保护。您不得复制、修改、分发或使用这些内容，除非获得我们的明确书面许可。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">5. 免责声明</h2>
          <p className="text-gray-300 leading-relaxed">
            我们的服务仅供娱乐和参考，不应被视为专业建议。我们不对服务内容的准确性、完整性或可靠性做出任何保证。使用我们的服务所产生的任何后果，由您自行承担责任。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">6. 责任限制</h2>
          <p className="text-gray-300 leading-relaxed">
            在法律允许的最大范围内，LOOM 及其关联公司、董事、员工和代理商不对任何直接、间接、偶然、特殊或后果性损害承担责任，包括但不限于利润损失、数据损失或业务中断，无论其基于何种法律理论。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">7. 终止</h2>
          <p className="text-gray-300 leading-relaxed">
            我们保留随时终止或暂停您访问服务的权利，无需事先通知，原因包括但不限于您违反本条款。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">8. 条款修改</h2>
          <p className="text-gray-300 leading-relaxed">
            我们可能会不时更新本服务条款。我们将通过在网站上发布更新后的条款来通知您任何更改。您继续使用服务即表示您接受修改后的条款。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">9. 适用法律</h2>
          <p className="text-gray-300 leading-relaxed">
            本条款受您所在国家或地区法律的管辖。任何与本条款有关的争议应提交至有管辖权的法院解决。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">10. 联系我们</h2>
          <p className="text-gray-300 leading-relaxed">
            如果您对本服务条款有任何问题或疑虑，请通过以下方式联系我们：
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            电子邮件：support@mysticx.ai<br />
            地址：虚拟地址，仅供参考
          </p>
        </div>
      </section>
    </div>
  )
}