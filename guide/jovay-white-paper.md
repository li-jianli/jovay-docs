---
outline: deep
---

# Jovay: Trustless Scalability for Mass Adoption

## Abstract
Web3 is evolving into global financial infrastructure's foundational layer through Real-World Asset (RWA) tokenization, blockchain scalability advancements, and AI integration. Jovay addresses this shift as a high-performance, secure Ethereum Layer 2 solution for next-generation digital finance and RWA integration.

To overcome blockchain scalability limitations, Jovay implements a fully pipelined parallel execution engine decomposing transactions into discrete units for concurrent processing at transaction, block, and batch levels. This achieves cluster-scale throughput with reduced end-to-end latency.

The security model uses a phased heterogeneous validity proof mechanism: initially Trusted Execution Environments (TEE) for fast finality and scalable proof generation, transitioning to Zero-Knowledge Proofs (ZKP) for stronger cryptographic guarantees. Novel algorithmic optimizations, particularly in trace generation, significantly reduce proof resource consumption while maintaining linear proof time complexity. Key innovations include a Sumcheck-based PIOP architecture featuring full base-field operations, table-based rotation optimization, and multi-sized chip batching, combined with WHIR Scheme adoption (40%+ efficiency gain) and clustered GPU acceleration (>20× Sumcheck speedup versus CPU).

A comprehensive performance analysis framework has been established, incorporating a realistic traffic model based on industry-wide application distributions. This model enables systematic stress testing across diverse transaction types, including ERC-20 transfers, Uniswap V3 DEX operations, and native asset transfers. The analysis demonstrates Jovay's ability to achieve up to high throughput and low latency under high-concurrency workloads. The system exhibits linear scalability, with throughput increasing proportionally to hardware resources in compute-intensive scenarios, confirming Jovay's architectural suitability for large-scale financial applications.

Built on a modular architecture decoupling execution, proof services, data availability, and settlement, Jovay enables independent scaling and optimized resource allocation, positioning it as a foundational layer for secure, scalable, and intelligent RWA tokenization in next-generation Web3 financial ecosystems.

## 1.	Vision
Web3 is rapidly evolving from the Internet of Value into the foundational layer of next-generation financial infrastructure, driven by three key elements: crypto-economic primitives <sup>[[1]](#references)</sup>, blockchain scalability advancements, and AI integration. Leveraging crypto-economic primitives and integrating AI-driven economic operating systems, blockchain technology establishes Web3 as the foundational layer for global financial services. This convergence enables seamless integration of Real-World Assets (RWA) with on-chain intelligence, facilitating a paradigm shift in the digital economy. Public blockchains, particularly Ethereum, are transitioning from settlement-only layers to the backbone of the global digital economy—a shift propelled by three primary factors.

a)	**Crypto-Economic Primitives Revolution:** Stablecoins have surpassed a 200 billion market capitalization <sup>[[7]](#references)</sup>, serving as essential anchors for on−chain economic activity. As highlighted in Keyrock’s report, tokenization has the potential to fundamentally reshape the financial system. The World Economic Forum estimates that asset tokenization could reach 16 trillion by 2030 <sup>[[4]](#references)</sup>.

b)	**Architectural Evolution:** To resolve the "security-decentralization-scalability" trilemma, the industry has adopted decoupling strategies. Layer 1 scaling solutions, such as sharding <sup>[[10]](#references)</sup>, achieve throughput exceeding 100,000 TPS through network partitioning into 64 parallel sub-chains, though they encounter challenges including cross-shard communication latency and high migration costs. Layer 2 solutions introduce an "off-chain execution + on-chain settlement" paradigm, inheriting Ethereum’s security while delivering significant throughput gains. Prominent approaches include Plasma, state channels, sidechains, and Rollups <sup>[[11]](#references)</sup>. Rollups have emerged as the dominant paradigm, primarily categorized into Optimistic Rollups <sup>[[12]](#references)</sup> and ZK-Rollups <sup>[[13]](#references)</sup>.

c)	**Synergistic Integration Acceleration:** At the infrastructure level, projects like NEAR propose privacy-preserving, verifiable decentralized AI infrastructure based on decentralized AI networks <sup>[[8]](#references)</sup>. At the protocol level, agent-based AI economic frameworks are building intelligent transaction ecosystems; for example, Fetch.ai has secured partnerships with 4 million businesses, each accessing Fetch.ai’s AI agent services at $10 per instance. At the application level, emerging financial models such as RWA integration employ AI for risk control and pricing, enhancing financial systems. AI-driven development tools and financial management products further demonstrate the potential of "AI+Web3" convergence.

Jovay has been designed as an Ethereum Layer 2 solution to address this paradigm shift. To achieve high performance and low latency, a fully pipelined parallel execution engine is employed in transaction processing. This engine decomposes transaction workflows into independent execution units scheduled in parallel, complemented by dynamic load balancing. Consequently, cluster-level scalability is enabled while response latency is significantly reduced. For security, a hybrid proof system combining Trusted Execution Environments (TEE) and Zero-Knowledge (ZK) proofs is adopted. An intelligent development toolchain is provided, integrating AI-assisted contract authoring, debugging, performance analysis, and security auditing to deliver end-to-end support from code to deployment.

With a core focus on RWA integration, Jovay aims to establish a high-performance, high-security Layer 2 transaction network as the technical foundation for next-generation digital financial services. The technical roadmap adheres to the principle of "pragmatism-first," aligning with on-chain asset scale and business complexity requirements.

The performance metrics for Jovay are derived from our non-clustered testnet configuration, demonstrating a single-node Layer 2 throughput of 15,700–22,000 TPS under targeted workloads. These figures represent pure Layer 2 processing capacity excluding Layer 1 data rollup, as Layer 1 throughput constitutes the bottleneck. Our next priority is scaling the network to a target of 100,000 TPS through node clustering and horizontal expansion. Achieving this throughput requires optimizing key components, including the execution engine. DTVM, a tiered, lazy Just-In-Time (JIT) compilation engine for deterministic smart contract execution, has been designed and implemented and is now open-sourced <sup>[[22]](#references)</sup>. The core JIT engine of DTVM is decoupled from specific virtual machine implementations. It is being adapted for EVM bytecode; upon completion, it will serve as Jovay’s next-generation execution engine, delivering enhanced contract processing performance. Community contributions and suggestions are welcome.

Security is reinforced through multiple layers, complementing the heterogeneous architecture of TEE and ZK proof mechanisms. The codebase has undergone rigorous security audits by our Skyward Lab and multiple leading security auditors <sup>[[21](#references),[40](#references)]</sup>. Key internal subsystems, including the Sequencer, Prover, and Relayer, have been subjected to comprehensive security assessments. For advanced proving system, RISC-V-based ZKVMs <sup>[[23](#references), [24](#references), [25](#references)]</sup> are gaining adoption. From a cryptographic perspective, comprehensive optimizations have been implemented across algorithms, from SNARKs <sup>[[28]](#references)</sup> to STARKs <sup>[[29]](#references)</sup>, from Goldilocks <sup>[[26]](#references)</sup> to BabyBear <sup>[[27]](#references)</sup>, and from Plonky2 <sup>[[26]](#references)</sup> to Plonky3 <sup>[[27]](#references)</sup>. It is noted that proof protocols based on the Sumcheck paradigm, when combined with superior commitment schemes like Basefold or WHIR <sup>[[30]](#references)</sup>, may further reduce proof-generation resource consumption while maintaining Sumcheck’s linear proof time. However, several challenges remain:

a)	**Trace Generation Efficiency:** Efficient generation of execution traces required by ZKVMs during block processing.

b)	**Proof Algorithm Efficiency:** Efficient combination of Sumcheck protocols with Polynomial Commitment Schemes (PCS) to build GPU-friendly, multi-circuit aggregation proof schemes.

c)	**Security Assurance:** Ensuring foundational theoretical security and implementation soundness amid rapid algorithm iteration, requiring collaborative community efforts.

To address these challenges, a novel zero-knowledge proof system has been introduced. Collaboration with academic researchers has been conducted to analyze the security of ZK-SNARKs under the Generic Group Model (GGM). This work reveals how group encoding length impacts protocol security and proposes the first formal framework to quantify the relationship between encoding parameters and security guarantees. The research establishes a theoretical basis for standardizing security arguments in GGM for zero-knowledge proofs, with the related paper accepted by Asiacrypt 2024, a top cryptographic conference <sup>[[9]](#references)</sup>.

## 2.	Design Principles and Objectives
To address the key challenges in evolving next-generation financial infrastructure, modularity is increasingly adopted by Layer 2 architectures, thereby enhancing scalability and extensibility across performance, cost, and security dimensions. Jovay’s modular architecture is designed around the following layered principles:

a)	**Execution Layer Specialization:** High-performance transaction processing relies on specialized execution engines and parallel strategies—critical factors for both Layer 1 and Layer 2 systems extensively studied [15, 16, 17, 18]. For Layer 2’s centralized transaction sequencing model, parallelization strategies and scalable execution frameworks are particularly vital. Modular design enables an independent execution layer to maximize transaction throughput while prioritizing ecosystem compatibility through seamless support for EVM-based development languages and transaction interfaces.

b)	**Arbitration Layer Diversification:** Layer 2 arbitration mechanisms follow two primary paradigms: Fraud Proofs (relying on challenge periods and node verification) and Validity Proofs (using verifiable computation for instant correctness verification). Jovay adopts the validity proof approach, which can be implemented via ZK proofs or TEEs. TEEs offer high scalability and rapid confirmation times but require hardware-specific environments. ZK proofs provide mathematically rigorous security with minimal trust assumptions, and performance continues to improve through acceleration advancements. The hybrid verification mechanism proposed by Vitalik Buterin <sup>[[20]](#references)</sup>—combining ZK, TEE, and Optimistic Rollup techniques—aligns with this approach to enhance system robustness through multi-layer verification.

c)	**Data Availability Stratification:** Rollups typically store transaction data on Ethereum’s mainnet, incurring high storage costs during high-frequency RWA trading. The Dencun upgrade (EIP-4844), introducing Blob transactions, has significantly reduced data costs <sup>[[14]](#references)</sup>. Core transaction data must still be stored on Ethereum’s mainnet. For large volumes of ephemeral data (e.g., intermediate states for fast settlements), cost-effective Data Availability (DA) options must be available to balance cost and security.

d)	**Settlement Layer Independence:** The settlement layer manages asset transfers and state finality between Layer 1 and Layer 2. Modular design enables independent deployment while ensuring cross-chain security and supporting Fast Finality. This layer utilizes a State Commitment Chain and bridge contracts to handle asset locking/unlocking, serving as the definitive source for arbitration layer verification.

Based on these principles, Jovay implements standardized interfaces between modules with clearly defined interaction protocols to achieve composability. This modular design not only enhances flexibility and scalability but also enables targeted upgrades to individual modules, facilitating rapid adaptation to evolving financial infrastructure demands and effectively addressing industry challenges.

Furthermore, Jovay fully integrates with the AI ecosystem. Rapid advancements in Large Language Models (LLMs) enable the development of more intelligent and user-friendly Web3 ecosystems. Seamless integration with AI represents a natural progression in Web3’s development trajectory.

## 3.	Architecture
### 3.1.	Architecture Overview
Confronting the demands of Web3’s paradigm shift for high performance, scalability, and security, Jovay—a Layer 2 network integrated into the Ethereum ecosystem—is designed around a modular philosophy to establish an efficient, flexible, and evolvable blockchain infrastructure. Through parallelized execution technology, throughput is enhanced; via a hybrid proof roadmap, long-term security evolution is ensured; and through comprehensive integration with the AI ecosystem, real-time demands of financial applications are met.

a)	**Scalable Throughput:** The transaction lifecycle comprises multiple stages—execution, proof generation, and data publication—each with distinct computational, storage, and network resource requirements. Jovay’s modular architecture decouples these functions, enabling independent scaling of modules such as execution and proof layers. Consequently, single-component bottlenecks are eliminated, and the system’s overall throughput achieves elastic scaling.

b)	**Hybrid Proof System:** Jovay employs a validity proof approach to instantly verify transaction correctness, thereby ensuring faster finality and enhanced security. An evolutionary strategy is adopted, transitioning from Trusted Execution Environments (TEE) to Zero-Knowledge Proofs (ZKP). The current phase utilizes TEE for high scalability and rapid confirmation times, while the next phase will transition to a ZKP system based on cryptographic reliability. Research on ZKP algorithm security within the Generic Group Model <sup>[[9]](#references)</sup> establishes the foundation for this long-term security evolution.

c)	**Comprehensive Integration with the AI Ecosystem:** Jovay’s system design supports the fusion of AI and Web3. Its verifiable computation capability provides a trusted verification layer for on-chain AI agent behavior and AI model inference results. This establishes a robust technical foundation for AI-driven automated trading strategies, intelligent risk assessment, and enhanced AI-assisted development experiences.

### 3.2.	Detailed System Design
Based on the aforementioned principles, Jovay comprises multiple subsystems with clearly defined functionality, which coordinate efficiently through standardized interfaces. The architecture is illustrated below, demonstrating core subsystems and the main transaction processing flow.

![Figure 1 Architecture of Jovay](/Images/jovay-white-paper/architecture-of-jovay.png)
<p align="center">
  <span style="font-size: 14px;">Figure 1 Architecture of Jovay</span>
</p>

a)	Sequencer Subsystem: The Sequencer subsystem is responsible for transaction execution, batching, block generation, and real-time return of transaction receipts.

b)	Tracer Subsystem: Transaction execution traces are recorded by the Tracer subsystem, and the required data structures for SPV verification are constructed. This subsystem also serves as a buffer between the real-time Sequencer and the proof system.

c)	Bridge Subsystem: The Bridge subsystem is responsible for packing and publishing raw transactions to the Data Availability (DA) layer (currently Ethereum L1), handling proof submission, and managing cross-chain interoperability between L1 and L2, including L1 deposits and L2 withdrawals.

d)	Prover Subsystem: The Prover subsystem is responsible for verifying the correctness of transaction execution results, utilizing hardware-based proofs via TEE and software-based proofs via ZKP. The current phase employs a TEE-based proof system, with a gradual transition to a ZKP-based system underway.

### 3.3.	Sequencer Subsystem Design: Parallelized Execution Technology
![Figure 2 Scalable parallel mechanism](/Images/jovay-white-paper/scalable-parallel-mechanism.png)
<p align="center">
  <span style="font-size: 14px;">Figure 2 Scalable parallel mechanism</span>
</p>

a)	Computation and Storage Decoupling: The decoupling of computation and storage enables parallel transaction processing, with parallel read/write operations addressing read/write amplification inherent in blockchain's verifiable storage requirements. The Sequencer implements a compute-storage decoupled architecture, enabling horizontal scalability of both compute and storage units. Following scheduler-based transaction grouping, transactions are dispatched to parallel compute units for execution, with results written in parallel to distributed storage units. Efficient hardware resource utilization is achieved through this approach, thereby avoiding CPU and storage I/O bottlenecks.

b)	Asynchronous Multi-Stage Pipelining for Inter-Block Parallelism: Asynchronous scheduling of a multi-stage pipeline enables parallel block processing, thereby improving resource utilization. Each block's processing is divided into sequential pipeline stages, with subsequent stages depending solely on the completion of preceding stages. This architecture allows the Sequencer to process multiple blocks simultaneously, achieving block-level parallelism, increasing system throughput, and significantly reducing user transaction processing latency.

c)	Adaptive Transaction Parallelism for Intra-Block Parallelism: Transactions are first routed to an independent transaction pool for asynchronous validation and read-write set analysis. In the execution pipeline, a DAG grouping algorithm based on pre-analyzed read-write sets partitions non-dependent transactions into distinct groups, which are scheduled for parallel execution across distributed executors. Transaction groups encountering read-write conflicts are subsequently rescheduled based on actual execution results. This mechanism maximizes transaction parallelism while maintaining execution consistency with serial execution.

### 3.4.	Prover Subsystem Design: Validity Proof Technology
#### 3.4.1.	TEE Prover Subsystem
The TEE-based proof system, designated as TEE Prover, supports parallelized proof generation. Trustworthiness is ensured through a trust chain system and on-chain verification contracts, while a unified verification interface enables extension of multiple TEE solutions.

**Validity Proof**
The TEE Prover generates validity proofs for transaction batch execution. Input comprises the prior world state S and transaction batch transactions T. The TEE prover generates a new world state S^' and a proof P by executing f(S,T). P provides proof of the execution of f(S,T). This enables Layer 1 contracts to confirm world state transitions. Key advantages include:

a)	**Verifiable Computation:** Supports verifiable and replayable computation for complex transaction data and read-write sets.

b)	**Multi-dimensional Parallelism:** Implements pipeline parallelism across batch, chunk, and block levels to maximize trusted computing resource utilization.

c)	**Heterogeneous TEE Support:** Enables trust chain aggregation and clustered heterogeneous networking for diverse TEE hardware.

d)	**Neutrality:** Abstracts underlying trust chain differences via a Unified Attestation Service (UAS), meeting multi-cloud deployment requirements.

**Trust Chain Establishment**
![Figure 3 Proving system based on TEE](/Images/jovay-white-paper/proving-system-based-on-tee.png)
<p align="center">
  <span style="font-size: 14px;">Figure 3 Proving system based on TEE</span>
</p>

a)	**Node On-Chain Registration:** TEE Prover node measurement information is registered on L1 prior to service initiation, enabling external review and verification.

b)	**Node Initialization Verification:** During startup, the trust chain extends sequentially from hardware level: hardware initialization → TEE Prover enclave creation → TEE Prover quote generation. This ensures secure enclave loading and trusted report generation.

c)	**Node Registration Verification:** Upon registration with the Prover Controller (PC), remote attestation verifies the TEE Prover’s report. This basic check confirms legitimacy before on-chain verification.

d)	**Runtime On-Chain Verification:** During operation, the TEE Prover executes validity proofs within the enclave, signs results, and generates a trusted report (Quote). The Layer 1 Rollup contract invokes the TEE verification contract to validate the Quote.

**TEE Verification Contract**
![Figure 4 Trust chain of proving system](/Images/jovay-white-paper/trust-chain-of-proving-system.png)
<p align="center">
  <span style="font-size: 14px;">Figure 4 Trust chain of proving system</span>
</p>

The TEE verification contract validates Quote trustworthiness, extracts commitments, and returns them to the Rollup contract. This process involves:

a)	**On-chaining of Trusted Verification Materials:** Administrators upload Intel PCS verification materials to the PCCS contract, which verifies timestamps and signatures.

b)	**On-chain Quote Verification:** The contract validates Quote authenticity and integrity.

c)	**Application Measurement Verification:** Compares mrsigner and mrenclave in the Quote against on-chain registered measurement data to confirm trusted TEE Prover origin.

#### 3.4.2.	ZK Prover Subsystem
Zero-knowledge proofs were introduced by Goldwasser, Micali, and Rackoff <sup>[[31]](#references)</sup>. Groth’s 2010 work <sup>[[32]](#references)</sup> established the theoretical foundation for ZK-SNARKs. Pinocchio <sup>[[33]](#references)</sup> (2013) reduced proof and verification times to practical levels, forming Zcash’s basis. Groth16 <sup>[[34]](#references)</sup> (2016) optimized proof sizes, remaining a state-of-the-art algorithm. Bulletproofs <sup>[[35]](#references)</sup> (2017) enabled short, non-interactive proofs without trusted setup (adopted by Monero). ZK-STARKs <sup>[[36]](#references)</sup> (2018) provided trusted-setup-free protocols and theoretical foundations for high-performance algorithms. Plonk <sup>[[37]](#references)</sup> (2019) introduced Plonkish arithmetization, supporting custom gates and lookup tables.

Current industry trends favor Risc-V-based ZKVMs, with open-source projects like Risc0 <sup>[[25]](#references)</sup> and SP1 <sup>[[24]](#references)</sup> competing on circuit representations and acceleration. Most ZKVMs are built on Plonky3 <sup>[[27]](#references)</sup>. However, mainstream STARK-like ZKVMs face two critical limitations: Proof generation relies on computationally intensive Number Theoretic Transform (NTT) operations, which resist efficient hardware parallelization. Traditional Algebraic Intermediate Representation (AIR) circuits enforce serial execution, limiting parallelism and causing underutilized hardware resources in large-scale scenarios. Additionally, frontend fragmentation forces developers to adapt hardware acceleration code across platforms, reducing development efficiency.

To address these limitations, Jovay ZK Prover adopts a layered technical approach (Figure 5). Initial implementation on a 32-core CPU demonstrates over 30% performance improvement versus state-of-the-art (SOTA) work <sup>[[19]](#references)</sup> (Figure 6).

![Figure 5 Overall architecture of the Jovay ZK Prover](/Images/jovay-white-paper/overall-architecture-of-the-jovay-zk-prover.png)
<p align="center">
  <span style="font-size: 14px;">Figure 5 Overall architecture of the Jovay ZK Prover</span>
</p>

![Figure 6 Performance comparison of Jovay ZK Prover with state-of-the-art work](/Images/jovay-white-paper/performance-comparison-of-jovay-zk-prover-with-state-of-the-art%20work.png)
<p align="center">
  <span style="font-size: 14px;">Figure 6 Performance comparison of Jovay ZK Prover with state-of-the-art work</span>
</p>

The key technical features of Jovay ZK Prover are as follows.

a)	**High-Performance Static Binary Translation:** Translates Risc-V instructions to x86-64 instructions instruction-by-instruction, enabling efficient execution on x86-64 processors. This achieves performance far exceeding interpreter-based solutions. An instruction-specific record generation technique enables native x86-64 record generation, yielding 10–100× speedups in pure execution and ~6× gains in scenarios involving record generation.

b)	**GPU-Accelerated Trace Generation:** GPUs accelerate trace generation across all ZKVM chips, delivering 10–50× speedups per chip.

c)	**Sumcheck-based PIOP Architecture:** Reduces AIR satisfiability to a summation problem, using Sumcheck as the core protocol.

<div style="margin-left: 2em;">i.	<b>Full Base-Field Sumcheck Protocol [38]:</b> Avoids extension field calculations via "Sumfold" technique, operating entirely within the base field.</div><br>

<div style="margin-left: 2em;">ii.	<b>Table-Based Rotation Overhead Reduction:</b> Converts linear rotation complexity to constant via table construction and lookup, minimizing performance impact.</div><br>

<div style="margin-left: 2em;">iii.	<b>Multi-Sized Chip Batch Processing:</b> Introduces chips into SumCheck execution when trace sizes match, reducing computational complexity in multi-chip scenarios.</div><br>

<div style="margin-left: 2em;">iv.	<b>AIR Constraint Evaluation Optimization:</b> Separates univariate polynomial computation for the special eq polynomial, avoiding extra AIR constraint evaluations.</div><br>

<div style="margin-left: 2em;">Retains polynomials from previous rounds, leveraging evaluation point relationships to reduce next-round calculations.</div>

![Figure 7 Core technical features of PIOP and PCS of Jovay ZK Prover](/Images/jovay-white-paper/core-technical-features-of-piop-and-pcs-of-jovay-zk-prover.png)
<p align="center">
  <span style="font-size: 14px;">Figure 7 Core technical features of PIOP and PCS of Jovay ZK Prover</span>
</p>

d)	**Polynomial Commitment Scheme (PCS) Innovations**

<div style="margin-left: 2em;">i.	Support for Rotations: Enables opening both original and rotated polynomials at a given random point, supporting batch processing.</div><br>

<div style="margin-left: 2em;">ii.	Multi-Sized Polynomial Batch Processing: Processes polynomials from largest to smallest, merging via Sumcheck when sizes match.</div><br>

<div style="margin-left: 2em;">iii.	WHIR Scheme Adoption: Reduces verifier queries via out-of-domain queries, combined with Jagged Dense commitment to improve commitment generation and verification efficiency by >40%.</div><br>

e)	**Clustered GPU Acceleration Framework:** Leveraging hardware acceleration expertise from Plonky3/STWO projects, a GPU cluster solution achieves >20× Sumcheck acceleration versus 32-core CPU platforms. Distributed proof generation is supported, with hardware-software co-design and batching optimizing GPU utilization under memory bandwidth constraints. Full-process GPU acceleration minimizes CPU-GPU data transfer, enabling end-to-end acceleration for ZKVM-specific circuits.

f)	**Multi-Frontend Compatibility:** A flexible Intermediate Representation (IR) layer supports seamless integration with mainstream ZKVM frontends (Risc0, SP1) and accommodates both AIR and Plonkish circuit representations, resolving ecosystem fragmentation.

g)	**Open Compute Network Infrastructure:** Jovay designs a distributed, open proof network architecture to overcome zero-knowledge proof computational bottlenecks and enhance ZK Prover decentralization (Figure 8). The Prover Controller manages multiple proving networks, distributing tasks based on specific strategies.

![Figure 8 Proof network architecture](/Images/jovay-white-paper/proof-network-architecture.png)
<p align="center">
  <span style="font-size: 14px;">Figure 8 Proof network architecture</span>
</p>

Current L2 batch generation intervals and lengthy proof times per batch cause high latency and idle resources (Figure 9). To address this, a fine-grained pipelining mechanism decomposes tasks at the chunk level, enabling task-level parallelism and dynamic resource allocation (Figure 10). This maximizes compute utilization, reduces latency, and improves performance. Fine-grained decomposition also facilitates open network distribution, matching tasks to proving networks based on computational capabilities.

![Figure 9 Original batch proofs](/Images/jovay-white-paper/original-batch-proofs.png)
<p align="center">
  <span style="font-size: 14px;">Figure 9 Original batch proofs</span>
</p>

![Figure 10 Fine-grained batch proofs](/Images/jovay-white-paper/fine-grained-batch-proofs.png)
<p align="center">
  <span style="font-size: 14px;">Figure 10 Fine-grained batch proofs</span>
</p>

## 3.5.	Relayer Subsystem Design: Security Mechanism
### 3.5.1.	Relayer responsibilities and authorities
In Jovay, a Relayer functions as a stateless cross-chain messenger, tasked with forwarding messages between Layer 1 (Ethereum) and Layer 2 (Jovay). The Relayer holds no authority to mint tokens on Jovay or to execute state transitions directly on the Jovay chain. Its primary responsibility is message relaying, with token minting and state execution contingent upon validation by the MsgOracle consensus mechanism.

Token minting on Jovay is only finalized following validation by multiple MsgOracle nodes. A MsgOracle constitutes an independent validator set, responsible for verifying and endorsing messages relayed by Relayers. A message is deemed valid only after a predefined quorum of MsgOracle approvals is achieved, triggering the Jovay chain to execute finalization. The Jovay chain does not inherently trust messages forwarded by any single Relayer. Cross-chain messages must undergo verification by multiple MsgOracles and be cross-checked against Layer 1 data (including events, values, proofs, and nonces) prior to final execution.

**Core Responsibilities of the Relayer**

a)	**Relay Layer 1 → Layer 2 Messages:** Monitor L1Mailbox events on Ethereum (e.g., SentMsg), extracting message payloads from event data. Package messages and submit them to the Jovay L2Mailbox contract, marking them as pending verification.

b)	**Submit Layer 2 Batches and Proofs to Layer 1:** Aggregate consecutive Layer 2 blocks into a batch. Submit batch data and associated proofs to the Ethereum Rollup contract, completing batch finalization on Layer 1.

c)	**Collaborate with Tracer/Prover:** Retrieve block execution traces from the Tracer for blocks included in a batch. Submit traces to the Prover Controller, which generates validity/fraud proofs for batch verification.

**Permissions and Trust Assumptions**

a)	**No direct minting authority:** The Relayer cannot mint tokens on Jovay. Finalization actions (e.g., finalizeDeposit) are executed solely after sufficient MsgOracle approvals are received by the Layer 2 bridge contract.

b)	**No single-point finality:** Relayer-forwarded messages are initially marked as pending on Layer 2, requiring MsgOracle validation and on-chain approval before execution.

c)	**Multi-Oracle consensus:** MsgOracle validators sign off according to a configured threshold (e.g., M-of-N). Upon threshold achievement, the MsgOracle contract marks the message as executable, triggering finalization logic.

### 3.5.2.	Relayer Flow: Relaying Layer 1 Messages to Layer 2
A key Relayer responsibility involves forwarding cross-chain messages from Layer 1 (Ethereum) to Layer 2 (Jovay). Such messages must undergo independent verification by multiple MsgOracle nodes on Layer 1 before being recognized as valid on Layer 2.

![Figure 11 Relayer messages verified by multiple MsgOracle nodes](/Images/jovay-white-paper/relayer-messages-verified-by-multiple-msgoracle-nodes.png)
<p align="center">
  <span style="font-size: 14px;">Figure 11 Relayer messages verified by multiple MsgOracle nodes</span>
</p>

### 3.5.3.	Relayer Rollup Message Flow to Layer 1
The Jovay chain continuously generates blocks. During this process, the Relayer aggregates multiple blocks into a batch, retrieves execution traces for the batch from the Tracer, and submits the traces to the Prover Controller. The Prover Controller assigns proof generation to the prover pool. Upon proof completion, the Relayer submits the batch and its proof to the Ethereum Rollup contract. The Rollup contract validates the proof using Verifier contracts (e.g., TEEVerifier and ZKVerifier). Successful verification triggers batch acceptance and state updates on Layer 1. The high-level flow is summarized as follows.

![Figure 12 Relayer rollup message flow to Layer 1](/Images/jovay-white-paper/relayer-rollup-message-flow-to-layer1.png)
<p align="center">
  <span style="font-size: 14px;">Figure 12 Relayer rollup message flow to Layer 1</span>
</p>

## 4.	Performance
### 4.1.	Traffic Model
An analysis of application traffic distribution across mainstream Web3 blockchain networks was conducted, focusing on applications with over 10,000 contracts to characterize their business scenarios. The distribution of application types is illustrated in Figure 13. Theoretical transaction traffic system models based on different queuing models and transaction processing stage categorizations in blockchain networks have been proposed in prior works [39, 40]. The actual distribution of mainstream Web3 applications serves as the background traffic for this analysis, with mainstream business scenarios selected as the traffic input for blockchain transaction stress tests. Consequently, the traffic model defined for these stress tests is established based on this foundation.

![Figure 13. Distribution of mainstream Web3 applications in the industry](/Images/jovay-white-paper/distribution-of-mainstream-web3-applications-in-the-industry.png)
<p align="center">
  <span style="font-size: 14px;">Figure 13. Distribution of mainstream Web3 applications in the industry</span>
</p>

Let m represent the number of typical transaction scenarios. For each scenario $i ∈ \{1,2,…,m\}$, let $w_i$ denote the traffic weight (proportional coefficient) such that $\; \sum_{i=1}^{m} w_i = 1$; and $λ_i$  represent the baseline TPS under independent stress testing. Let $k$ denote the baseline TPS of the background traffic. The defined stress test traffic model is expressed as:


<div align="center">

$$
TPS_{\text{mix}} = k + \sum_{i=1}^{m} w_i \lambda_i
$$

</div>

The selected typical scenarios are as follows:

a)	**Standard ERC-20 Token Transactions:** Covers high-frequency standard contract calls including transfers and approvals. This scenario reflects system throughput and latency under "massive homogeneous transactions + medium state read/write" conditions, measuring platform performance in batch processing, storage, and concurrent scheduling for mainstream asset interactions.

b)	**Uniswap V3 Decentralized Exchange (DEX) Transactions:** Represents high-complexity DeFi contracts involving multi-hop routing, concentrated liquidity, and price updates. This scenario evaluates tail latency and execution bottlenecks under long call chains and high concurrency conflicts, assessing performance under complex business loads.

c)	**Native Asset Transfer:** The simplest transaction form with no contract execution. It primarily validates maximum throughput and optimal confirmation latency for signature verification, packing, and consensus chain operations, characterizing the theoretical performance upper limit with minimal business logic.

d)	**Background Loads:** A mix of ERC-20, NFT, DEX, and other traffic types proportional to real-world networks, running stably over extended periods. This scenario tests resource consumption, tail latency, and stability under daily loads, evaluating performance in everyday operational conditions.

The Jovay network was subjected to a continuous baseline of mixed background loads. Against this background, peak TPS was benchmarked for two dominant transaction types: ERC-20 and native asset transfers. This methodology reflects a real-world scenario where the network processes diverse traffic while handling high volumes of prevalent operations.

Benchmark tests demonstrate robust system performance across various workloads. On a 32-core, 64GB node configuration, the network achieves a peak throughput of 30,000 transactions per second (TPS) for standard ERC-20 token transfers and 28,000 TPS for native asset transfers. Critically, even under these high-volume conditions, the system maintains low end-to-end latency of approximately 160ms, ensuring rapid transaction finality and responsive user experience.

### 4.2.	Performance Modeling
To guide performance optimization and business expansion, a formal performance model has been constructed. The system's core metric, TPS (Transactions Per Second), measures the number of transactions processed per second, defined as:

<div align="center">

$$
\text{TPS} = \frac{\text{Number of Transactions Processed
}}{\text{Time Spent}}
$$

</div>

According to our architecture, the primary factors influencing overall TPS are the Sequencer subsystem, the Rollup procedure, and the Layer 1 network. The TPS definitions for these three modules are as follows:

a) $\text{TPS}_{\text{sequencer}}$: The transaction processing capacity of the Sequencer subsystem, defined as the number of transactions that can be processed and packed into Layer 2 blocks per second. This parameter is primarily affected by transaction type and machine resources.

b) $\text{TPS}_{\text{Rollup}}$: The maximum throughput capacity of the Rollup process, defined as the number of Layer 2 transactions whose state can be verified and submitted to Layer 1 per second. The corresponding formula is: 

<div align="center">

$$
\text{TPS}_{\text{rollup}} =  \frac{\text{Maximum number of L2 transactions per batch}}{\text{Minimum batch interval}} 
$$

</div>

c) $\text{TPS}_{\text{L1}}$: The end-to-end throughput capacity of the Layer 2 system as limited by the Layer 1 blockchain (e.g., Ethereum). This parameter depends on Layer 1's block production speed and the proportion of blocks Layer 2 can secure. The corresponding formula is:

<div align="center">

$$
\text{TPS}_{\text{L1}} = \frac{\text{blob\_per\_batch} \times \text{batch\_per\_min} \times \text{tx\_per\_blob}}{60}
$$

</div>

<div style="margin-left: 2em;">where <i>blob_per_batch</i> represents the number of blobs per batch (e.g., Ethereum's limit is 6), <i>batch_per_min</i> represents the number of batches that can be submitted per minute (e.g., Ethereum's theoretical limit is 5), and <i>tx_per_blob</i> represents the number of transactions a blob can contain (e.g., approximately 600 for Jovay).</div>

Consequently, the overall end-to-end TPS of the Layer 2 network is constrained by the minimum of the above modules:

<div align="center">

$$
\text{TPS} = \min(\text{TPS}_{\text{sequencer}}, \text{TPS}_{\text{rollup}}, \text{TPS}_{\text{L1}})
$$

</div>

### 4.3.	Analysis and Discussions
**Peak Throughput**

The data demonstrates that increasing machine resources leads to higher peak TPS across various scenarios. When the number of CPU cores was increased from 16 to 32, the peak TPS for ERC-20 and Native Transfer scenarios rose from 22,000 to 30,000 and from 23,000 to 28,000, respectively. This indicates that Jovay exhibits strong linear scalability for compute-intensive, high-concurrency transactions, effectively utilizing additional machine resources to enhance processing capacity.
In the Background Loads scenario, peak TPS improvement was limited, increasing only from 240 to 260. This suggests that performance bottlenecks in these scenarios are not CPU computation-related but may stem from other factors such as contract logic complexity, state contention, or I/O limitations.

In summary, Jovay can significantly increase throughput in high-concurrency, compute-intensive scenarios (such as ERC-20 and Native Transfer) by scaling machine resources. However, TPS improvement is limited in scenarios involving complex or constrained contracts.

**Latency**

The data indicates that increasing CPU cores generally reduces transaction confirmation latency across all scenarios. In ERC-20 and Native Transfer scenarios, latency decreased from 192ms and 184ms to 160ms, respectively, when CPU cores were increased from 16 to 32. This demonstrates that additional computing resources effectively reduce transaction response time for high-load, concurrent transactions, thereby improving user experience.

For Background Loads and Uniswap V3 scenarios, latency remained relatively stable (101-102ms), further indicating that performance bottlenecks reside in other system components, with additional CPU cores having limited impact on latency reduction.
Overall, increasing machine resources significantly reduces latency in high-concurrency, compute-intensive transaction scenarios, while having a smaller impact on other scenarios.

**Conclusion**

The results demonstrate that our parallelized architecture effectively leverages horizontal hardware scaling to improve throughput and reduce latency in compute-intensive, high-concurrency scenarios (such as ERC-20 and Native Transfer). Simultaneously, the tests reveal that performance bottlenecks shift to contract logic or state access layers in scenarios involving complex contract interactions and mixed workloads. This finding guides the subsequent phase of performance optimization, which involves enhancing infrastructure scalability while implementing targeted optimizations within the contract execution layer.

## 5.	RWA Smart Tokenization on Jovay
### 5.1.	RWA Standardized Phases
Blockchain technology facilitates the tokenization of real-world assets (RWA) through a structured five-phase lifecycle model: underlaying asset onboarding, asset preparation, asset tokenization, tokenized asset issuance (primary issuance), tokenized asset trading (secondary market and derivatives). This standardized framework ensures seamless integration of real-world assets into Web3 and decentralized finance (DeFi) ecosystems while preserving traceability, verifiability, and regulatory compliance. Jovay RWA infrastructure follows the five-phase processes for secure and trustless tokenization.

**a)	Underlaying Asset Onboarding**

<div style="margin-left: 2em;">Real-world asset onboarding supports diverse types of assets such as new energy assets (e.g. EV charging equipment, photovoltaic equipment) and standard financial assets (e.g. bonds, bills, notes, trust). Taking new energy assets for example, due to their non-standard nature，hardware-software co-design solutions can be applied at the asset originator level to enhance trust, which benefits the subsequent tokenized asset issuance and trading processes. Secure IoT modules, software SDKs and proprietary chips can be employed to capture and authenticate real-time operational data. This data is then ingested into trusted asset management platforms for further processing.</div>

**b)	Asset Preparation**

<div style="margin-left: 2em;">Key asset metadata—including underlaying asset detail information, ownership records, valuation models, and yield generation mechanisms—are formalized for on-chain representation. Original data sources are cryptographically anchored to the blockchain via Merkle proofs or ZK-based commitments, ensuring immutability and auditability. Besides, multiple assets could be package together to form a SPV-like asset package.</div>

![Figure 14 RWA standardized phases](/Images/jovay-white-paper/rwa-standardized-phases.png)
<p align="center">
    <span style="font-size: 14px;">Figure 14 RWA standardized phases</span>
</p>

**c)	Asset Tokenization**

<div style="margin-left: 2em;">Tokenized asset portfolios are issued through verifiable smart contracts deployed on Jovay. These contracts encode automated revenue distribution logic and generate SPV-like tokenized asset certificates that represent fractional or full ownership rights.</div>

**d)	Tokenized Asset Issuance (Primary Issuance)**

<div style="margin-left: 2em;">The tokenized assets are initially issued to distributors by the issuer, and subsequently issued or transferred to end investors. Meanwhile, the verified investment reports and audited statements can be delivered to the participant institutions and end investors.</div>

**e)	Tokenized Asset Trading (Secondary Market and Derivatives)**

<div style="margin-left: 2em;">Secondary market activities such as redemptions, transfers, liquidity provisioning and decentralized finance (DeFi) derivatives like locking and re-issuance/borrowing/lending occur within regulated marketplaces governed by compliance frameworks. All financial transactions are enforced through programmable access controls and verified by on-chain settlement mechanisms, aligning with global supervisory standards.</div>

### 5.2.	Trusted Chain Architecture
Built upon the five-phase RWA lifecycle, the trusted architecture comprises six
functional layers designed to ensure end-to-end integrity, confidentiality, and
auditability: *a). **Asset Originator Layer**:* Proprietary IoT chipsets securely onboard
physical asset data (e.g., from EV charging stations, solar panels). Trusted Execution
Environments (TEEs) and Zero-Knowledge Proofs (ZKPs) establish verifiable data
bridges with third-party stakeholders. *b). **Asset Management Layer**:* Layer 2 network
supports efficient and low-cost asset tokenization. Temporal modeling capabilities
enable predictive analytics on data quality, risk indicators, and yield projections. *c).
**Asset Issuance Layer**:* Smart contracts formalize processed asset portfolios into
SPV-style tokenized structures. AI-powered modules assist in whitelist verification,
pathway analysis, and visual report in. *d). **Asset Trading Layer**:* Regulatory-compliant mechanisms govern asset redemptions and transfers. For international
investments, zkSQL-based verifiable reporting allows transaction validation without
exposing sensitive data details. *e). **Data Services Layer**:* Manages model assets,
executes offline/real-time data pipelines, and performs AI-assisted data quality
assessments. Ensures trustworthy asset modeling and generates tamper-proof
provenance records. *f). **Security Infrastructure Layer**:* End-to-end asset lifecycle
protection is achieved through ZKP-based verification, privacy-preserving
computation, and distributed key management systems.

![Figure 15 Technical architecture of RWA application](/Images/jovay-white-paper/technical-architecture-of-rwa-application.png)
<p align="center">
    <span style="font-size: 14px;">Figure 15 Technical architecture of RWA application</span>
</p>

## 5. Mission Forward
The evolution of blockchain technology has undergone continuous advancement, with Layer 2 representing a pivotal milestone in this journey. Jovay has redefined the possibility of expansion through technological innovation and provided infrastructure support for the large-scale application of Web3. We firmly believe that Jovay is not only a technical solution, but also a bridge to an open, efficient and decentralized future. With the prosperity and evolution of the ecosystem, Jovay will work with global partners to jointly write a new chapter in blockchain technology and industry ecology. We hope Jovay can work with you to "Tokenize the Future, Chain the Value".

## References
<a name="references"></a>

[1].	CoinBase, The Emergence of Cryptoeconomic Primitives, https://www.coinbase.com/zh-cn/blog/the-emergence-of-cryptoeconomic-primitives<br>
[2].	[Keyrock](https://keyrock.com/the-great-tokenization-shift-2025-and-the-road-ahead/), The Great Tokenization Shift: 2025 and the Road Ahead,2025<br>
[3].	Jeremy Allaire, “Blockchain is in from the cold — and stablecoins are set to change the financial system forever,” World Economic Forum, January 15, 2024.
[4].	Rajaram Suresh, Sumit Kumar, Darius Liu, Bernhard Kronfellner, and Aaditya Kaul, “Relevance of onchain Asset Tokenization in ‘Crypto Winter’,” Boston Consulting Group, September 12, 2022.<br>
[5].	What is Starknet: A Scalable Layer 2 Network for Ethereum. https://www.rapidinnovation.io/post/what-is-starknet-a-scalable-layer-2-network-for-ethereum#blog-hero<br>
[6].	Understanding L2 Fees: What They Are and Why They Matter, https://www.starknet.io/blog/understanding-l2-fees/<br>
[7].	Forbes, Top Stablecoins Coins Today By Market Cap, https://www.forbes.com/digital-assets/categories/stablecoins/?sh=779ba5751cd0<br>
[8].	Illia Polosukhin, Building Next-Gen NEAR AI Infrastructure with TEEs https://near.ai/blog/building-next-gen-near-ai-infrastructure-with-tees, January 20, 2025<br>
[9].	Keyu Ji, Cong Zhang, Taiyu Wang, Bingsheng Zhang, Hong-Sheng Zhou, Xin Wang, Kui Ren. "On the Complexity of Cryptographic Groups and Generic Group Models", ASIACRYPT 2024.<br>
[10].	Luu, L., Narayanan, V., Zheng, C., Baweja, K., Gilbert, S., Saxena, P., 2016. A secure sharding protocol for open blockchains. In: Proceedings of the 2016 ACM SIGSAC Conference on Computer and Communications Security. pp. 17–30.<br>
[11].	C. Sguanci, R. Spatafora, and A. M. Vergani, “Layer 2 blockchain scaling: A survey,” Jul. 2021, arXiv:2107.10881. Accessed: Apr. 18, 2022.<br>
[12].	H. A. Kalodner, S. Goldfeder, X. Chen, S. M. Weinberg, and E. W. Felten. Arbitrum: Scalable, private smart contracts. In W. Enck and A. P. Felt, editors, USENIX Security 2018, pages 1353–1370, Baltimore, MD, USA, Aug. 15–17, 2018. USENIX Association.<br>
[13].	S. Chaliasos, I. Reif, A. Torralba-Agell, J. Ernstberger, A. Kattis, and B. Livshits. Analyzing and benchmarking ZK-rollups. Cryptology ePrint Archive, Paper 2024/889, 2024. https://eprint.iacr.org/2024/889.pdf<br>
[14].	Dencun Mainnet Announcement, https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement<br>
[15].	Parallel Execution — docs.monad.xyz. https://docs.monad.xyz/ technical-discussion/execution/parallel-execution. [Accessed 23-01-2024].<br>
[16].	Sei Labs. Sei: The layer 1 for trading. https://github.com/sei-protocol/sei-chain/blob/main/whitepaper/Sei_Whitepaper.pdf. [Accessed 17-03-2024].<br>
[17].	The MystenLabs Team. The sui smart contracts platform. https://docs.sui.io/ paper/sui.pdf.<br>
[18].	Shahid R. Parallel Transaction Execution in Public Blockchain Systems[D]. University of Waterloo, 2024.<br>
[19].	What is authorize and capture?, https://www.checkout.com/blog/authorize-and-capture<br>
[20].	The multi-prover scheme. https://ethereum-magicians.org/t/a-simple-l2-security-and-finalization-roadmap/23309, 2025.<br>[21].	Antgroup Skyward Lab, https://github.com/antgroup-skyward<br>
[22].	Zhou W, Wei C, Yan Y, et al. DTVM: Revolutionizing Smart Contract Execution with Determinism and Compatibility[J]. arXiv preprint arXiv:2504.16552, 2025. ETH Proofs, https://ethproofs.org/<br>
[23].	S. Labs, “Sp1 zkvm,” 2024. [Online]. Available: https://blog.succinct.xyz/introducing-sp1/<br>
[24].	R. Z. T. Jeremy Bruestle, Paul Gafni, “Risc zero whitepaper,” https://dev.risczero.com/proof-system-in-detail.pdf, 2024, [Accessed 02-22-2024].<br>
[25].	P. Z. Team, “Plonky2: Fast recursive arguments with plonk and fri,” 2022, accessed: July 22, 2024. [Online]. Available: https://github.com/0xPolygonZero/plonky2/blob/main/plonky2/plonky2.pdf<br>
[26].	Plonky3, https://github.com/Plonky3/Plonky3<br>
[27].	Bryan Parno, Craig Gentry, Jon Howell, and Mariana Raykova. Pinocchio: Nearly Practical Verifiable Computation. IEEE S&P 2013.<br>
[28].	Eli Ben-Sasson, Iddo Bentov, Yinon Horesh, Michael Riabzev. Scalable, transparent, and post-quantum secure computational integrity. http://eprint.iacr.org/2018/046.pdf<br>
[29].	Gal Arnon, Alessandro Chiesa, Giacomo Fenzi, Eylon Yogev. WHIR: Reed–Solomon Proximity Testing with Super-Fast Verification. https://eprint.iacr.org/2024/1586<br>
[30].	Goldwasser, S., S. Micali, and C. Rackoff. (1989). “The Knowledge Complexity of Interactive Proof Systems.” SIAM Journal on Computing, 18(1), 186–208.<br>
[31].	Jens Groth. “Short Pairing-based Non-interactive Zero-Knowledge Arguments.” In Advances in Cryptology - ASIACRYPT 2010, volume 6477 of Lecture Notes in Computer Science, pages 321-340. Springer-Verlag, 2010.<br>
[32].	Bryan Parno, Jon Howell, Craig Gentry, and Mariana Raykova. “Pinocchio: Nearly Practical Verifiable Computation.” In Proceedings of the 2013 IEEE Symposium on Security and Privacy, pages 238–252. IEEE, May 2013. DOI: 10.1109/SP.2013.47.<br>
[33].	Jens Groth. “On the Size of Pairing-Based Non-Interactive Arguments.” In EUROCRYPT 2016, Lecture Notes in Computer Science, vol. 9666, pp. 305–326. Springer, 2016.<br>
[34].	Benedikt Bünz, Jonathan Bootle, Dan Boneh, Andrew Poelstra, Pieter Wuille, and Greg Maxwell. “Bulletproofs: Short Proofs for Confidential Transactions and More.” In 2018 IEEE Symposium on Security and Privacy (SP), pages 315–334. IEEE, May 2018. DOI: 10.1109/SP.2018.00020.<br>
[35].	Eli Ben-Sasson, Iddo Bentov, Yinon Horesh, and Michael Riabzev. “Scalable, Transparent, and Post-Quantum Secure Computational Integrity.” Cryptology ePrint Archive Report 2018/046, 2018.<br>
[36].	Ariel Gabizon, Zachary J. Williamson, and Oana Ciobotaru. “PLONK: Permutations over Lagrange-bases for Oecumenical Noninteractive arguments of Knowledge.” IACR Cryptology ePrint Archive, Report 2019/953, 2019.<br>
[37].	Wei, Y., Wang, K., Xiang, B., Zhang, X., Wang, H., Deng, Y., Zhu, X., & Lin, L. (2025). Packed Sumcheck over Fields of Small Characteristic with Application to Verifiable FHE. Cryptology ePrint Archive, Paper 2025/719. Retrieved from https://eprint.iacr.org/2025/719.<br>
[38].	Li B, Zhang H, Jiang C, Li Z, Sun Y. Performance modeling of blockchains with fixed block intervals[C]//Proceedings of the IEEE International Performance, Computing, and Communications Conference (IPCCC 2023). Anaheim, CA, USA: IEEE, 2023: 66-73.<br>
[39].	Esmaili M, Christensen K J. Performance modeling of public permissionless blockchains: a survey[J]. ACM Computing Surveys, 2025, 57(7): 174:1-174:35.<br>
[40].	Slow mist, https://slowmist.com/<br>
